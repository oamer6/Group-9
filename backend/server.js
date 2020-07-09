const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var crypto = require('crypto');

/////////////////////////////////////////
// Added for Heroku deployment.
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/////////////////////////////////////////
// Added for Heroku deployment.
app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;

//const url = 'mongodb+srv://user:admin@mern.shgwv.mongodb.net/MERN?retryWrites=true&w=majority';
// Changed for Heroku deployment.
const url = process.env.MONGODB_URI;

const client = new MongoClient(url, { useUnifiedTopology: true }); 
client.connect();

///////////////////////////////////////////////////
// For Heroku deployment
//if( process.env.NODE_ENV == 'production')
//{

///////////////////////////////////////////////////
// For Heroku deployment
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

///////////////////////////////////////////////////
// For Heroku deployment
app.get('*', (req, res) => 
{
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
});

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0].UserId;
    fn = results[0].FirstName;
    ln = results[0].LastName;
  }
  else
  {
    error = 'Invalid user name/password';
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:error};
  res.status(200).json(ret);
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, verifyPassword, userName } = req.body;
    const db = client.db();

    // validate

    if (email == null || password == null || verifyPassword == null || userName == null)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== verifyPassword)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await db.collection('Users').findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!userName) userName = email;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {email:email, password:hashedPassword, username:userName};

    const result = db.collection('Users').insertOne(newUser);
    const savedUser = await db.collection('Users').save(newUser);
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//}

// change dfor Heroku deployment
//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () => 
{
  console.log(`Server listening on port ${PORT}.`);
});
