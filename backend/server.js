const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxfec34c24bce7481b912ab06de0d3cd9c.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_KEY, domain: DOMAIN});
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = client.db();

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await db.collection('Users').findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

app.post('/reset', function (req, res) {
  const db = client.db();
  db.collection('Users').findOne({ email: req.body.email }, function (error, userData) {
      var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });
      var currentDateTime = new Date();
      var mailOptions = {
          from: 'morse.code.translate@gmail.com',
          to: req.body.email,
          subject: 'Password Reset',
          html: "<h1>Reset your password </h1><p>\
          <h3>Hello</h3>\
          Click on the link below to change your password.<br/>\
          <a href='http://localhost:5000/change-password/"+currentDateTime+"+++"+userData.email+"'>Click On This Link</a>\
          </p>"
      };

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
              db.collection('Users').updateOne({email: userData.email}, {
                  token: currentDateTime, 
                  
              },  {multi:true},function(err, affected, resp) {
                  return res.status(200).json({
                      success: false,
                      msg: info.response,
                      userlist: resp
                  });
              })
          }
      });
  })
});

app.post('/updatePassword',function(req, res){
  db.collection('Users').findOne({ email: req.body.email }, function (errorFind, userData) {
      if(userData.token==req.body.linkDate && req.body.password==req.body.confirm_password)
      {
          bcrypt.genSalt(10, (errB, salt) => {
              bcrypt.hash(req.body.password, salt, (err, hash) => {
                  if (err) throw err;
                  let newPassword = hash;
                  let condition = { _id: userData._id };
                  let dataForUpdate = { password: newPassword,updatedDate: new Date() };
                  db.collection('Users').findOneAndUpdate(condition, dataForUpdate, { new: true }, function (error, updatedUser) {
                      if (error) {
                          if (err.name === 'MongoError' && error.code === 11000) {
                            return res.status(500).json({msg:'Mongo Db Error', error:error.message});
                          }else{
                              return res.status(500).json({msg:'Unknown Server Error', error:'Unknow server error when updating User'});
                          }
                      }
                      else{
                              if (!updatedUser) {
                                  return res.status(404).json({
                                      msg: "User Not Found.",
                                      success: false
                                  });
                              }else{
                              return res.status(200).json({
                                  success: true,
                                  msg: "Your password are Successfully Updated",
                                  updatedData: updatedUser
                              });
                          }
                      }
                  });
              });
          });
      }
      if (errorFind)
      {
              return res.status(401).json({
              msg: "Something Went Wrong",
              success: false
          });
      }
  }
  );
 
})

app.post('/api/displaymessage', async (req, res, next) =>
{
	const { email } = req.body;

	const db = client.db();
	const results = await db.collection('Users').find({email: email}).toArray();

	var ret = { results:results, error:error};
	res.status(200).json(ret);
});

app.post('/api/storemessage', async (req, res, next) =>
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error

  var error = '';

  const { email, password } = req.body;

  const db = client.db();
  const results = await db.collection('Users').find({Login:email,Password:password}).toArray();

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


//}

// change dfor Heroku deployment
//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () => 
{
  console.log(`Server listening on port ${PORT}.`);
});
