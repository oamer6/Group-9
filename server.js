const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const _ = require('lodash');

/////////////////////////////////////////
// Added for Heroku deployment.
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const bcrypt = require("bcryptjs");
const saltRounds = 10;
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
    const { emailEntered, password } = req.body;
    const db = client.db();
	  
    const email = email.toLowerCase();
	  
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

    if (!user.active) {
      return res
        .status(400)
        .json({ msg: "This account has not yet been activated." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      id: user._id,
      email: user.email,
      userName: user.username
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { emailEntered, password, verifyPassword, userName } = req.body;
    const emailEntered = email.toLowerCase();
    const token = jwt.sign({email, userName, password}, process.env.JWT_ACC_CREATE);
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

    db.collection('Users').findOne({ email: email }, function (error, user) {
      var transporter = nodemailer.createTransport({
          // service: 'gmail',//smtp.gmail.com  //in place of service use host...

          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }

      });
      var mailOptions = {
          from: 'morse.code.translate@gmail.com',
          to: email,
          subject: 'Account Activation',
          html: "<h1>Welcome to Morse Code Translator! </h1><p>\
          <h3>Hello "+userName+",</h3>\
          Thank you for registering! Please click the link below to activate your account:<br />\
          <a href='https://mern-morse-code-translator.herokuapp.com/account-activation/"+token+"'>Click on this Link</a>\
          </p>"
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
             res.status(200).json({
              success: true
              //insertedId: result.insertedId,
              //matchedCount: result.matchedCount
            });

          }
      });
  })

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {email:email, password:hashedPassword, username:userName, token: token, active: false};

    const result = await db.collection('Users').insertOne(newUser);

    const newRegisteredUser= {userName: userName, email: email};
    res.status(200).json(newRegisteredUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Acivates a user with a given token (As of now, it throws no errors, but there's no side effects to that so it's fine)
app.post("/activate", async (req, res) => {
  try {
    const { token } = req.body;
    const db = client.db();

    // Validate
    if (!token) {
      return res.status(400).json({ msg: "No token provided." });
    }
    
    // Find user with this token, then activate if found
    var query = { token: token };
    var update = { $set: {active: true} };
    const doc = await db.collection('Users').findOneAndUpdate(query, update);
    if (!doc) {
      return res
        .status(400)
        .json({ msg: "No account with this token has been registered." });
    }

    return res
      .status(200)
      .json({ email: user.email, userName: user.userName});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/reset', async (req, res, next) => {
  const db = client.db();
  db.collection('Users').findOne({ email: req.body.email }, function (error, user) {
      var transporter = nodemailer.createTransport({
          // service: 'gmail',//smtp.gmail.com  //in place of service use host...

          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }

      });
      const token = jwt.sign({_id: user._id }, process.env.RESET_PASSWORD_KEY, {expiresIn: '20m'});
      var mailOptions = {
          from: 'morse.code.translate@gmail.com',
          to: req.body.email,
          subject: 'Password Reset',
          // text: 'That was easy!',
          html: "<h1>Welcome To Morse code translator! </h1><p>\
          <h3>Hello "+user.userName+"</h3>\
          If you are requested to reset your password, click on the link below:<br/>\
          <a href='https://mern-morse-code-translator.herokuapp.com/change-password/"+token+"'>Click On This Link</a>\
          </p>"
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
              console.log(user._id);
              console.log(token);
              var result = db.collection('Users').updateOne({ _id: user._id }, {$set: {token:token}});

             res.status(200).json({
              success: true
              //insertedId: result.insertedId,
              //matchedCount: result.matchedCount
            });

          }
      });
  })
});

app.post("/updatePassword", async (req, res, next) => {
  const db = client.db();
  const {token, newPass} = req.body;
  const salt =  await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPass, salt);
  if (token) {
    db.collection('Users').findOne({token: token}, (err, user) => {
      if (err || !user) {
        return res.status(400).json({error: "user w this token doesnt exist."});
      } else {
        var result = db.collection('Users').updateOne({_id: user._id}, {$set: {password: hashedPassword}});
        res.status(200).json({
          success: true
          //insertedId: result.insertedId,
          //matchedCount: result.matchedCount
        });
      }
    })
  } else {
    return res.status(401).json({error: "Auth. Error"});
    }
});

app.post('/displaymessage', async (req, res, next) =>
{
	try {
		const { userName } = req.body;
		const db = client.db();
		
		if (userName == null)
			return res.status(400).json({ msg: "Error: Username field is empty." });

		//res.status(200).json({ userName: userName });
		//const query = { receiver : userName };
		//var results = await db.collection('Messages').find(query).toArray();
		//const results = await db.collection('Messages').find({ receiver : userName});
		//var results = await db.collection('Messages').find({ receiver : userName });
		const ret = await db.collection('Messages').find({ receiver : userName }).toArray()
		//var ret;
		//if (results.length == 0) {
 		//	ret = { results : results };
		//}
		//else
		//{
		//	ret = [];
		//}
	
//		var ret = { results:results, error:error};
		
		return res.status(200).json({results : ret});
		//res.status(200).json(ret);
		//res.json(results);
	} catch (err) {
		return res.status(500).json({ error: err.message});
	}
});

app.post('/storemessage', async (req, res, next) =>
{
	try {
		const { message, userName } = req.body;
		const db = client.db();

		if (message == null)
			return res.status(400).json({ msg: "Error: Message field is empty." });

		if (userName == null)
			return res.status(400).json({ msg: "Error: Username field is empty." });

		let morseMap = new Map();
		morseMap.set(' ', '   ');
		morseMap.set('A', '.- ');
		morseMap.set('B', '-... ');
		morseMap.set('C', '-.-. ');
		morseMap.set('D', '-.. ');
		morseMap.set('E', '. ');
		morseMap.set('F', '..-. ');
		morseMap.set('G', '--. ');
		morseMap.set('H', '.... ');
		morseMap.set('I', '.. ');
		morseMap.set('J', '.--- ');
		morseMap.set('K', '-.- ');
		morseMap.set('L', '.-.. ');
		morseMap.set('M', '-- ');
		morseMap.set('N', '-. ');
		morseMap.set('O', '--- ');
		morseMap.set('P', '.--. ');
		morseMap.set('Q', '--.- ');
		morseMap.set('R', '.-. ');
		morseMap.set('S', '... ');
		morseMap.set('T', '- ');
		morseMap.set('U', '..- ');
		morseMap.set('V', '...- ');
		morseMap.set('W', '.-- ');
		morseMap.set('X', '-..- ');
		morseMap.set('Y', '-.-- ');
		morseMap.set('Z', '--.. ');
		morseMap.set('0', '----- ');
		morseMap.set('1', '.---- ');
		morseMap.set('2', '..--- ');
		morseMap.set('3', '...-- ');
		morseMap.set('4', '....- ');
		morseMap.set('5', '..... ');
		morseMap.set('6', '-.... ');
		morseMap.set('7', '--... ');
		morseMap.set('8', '---.. ');
		morseMap.set('9', '----. ');
		morseMap.set('&', '.-... ');
		morseMap.set('\'', '.----. ');
		morseMap.set('@', '.--.-. ');
		morseMap.set(')', '-.--.- ');
		morseMap.set('(', '-.--. ');
		morseMap.set(':', '---... ');
		morseMap.set(',', '--..-- ');
		morseMap.set('=', '-...- ');
		morseMap.set('!', '-.-.-- ');
		morseMap.set('.', '.-.-.- ');
		morseMap.set('-', '-....- ');
		morseMap.set('+', '.-.-. ');
		morseMap.set('"', '.-..-. ');
		morseMap.set('?', '..--.. ');
		morseMap.set('/', '-..-. ');

		var messageUp = message.toUpperCase();

		var morse = '';

		for (var i = 0; i < messageUp.length; i++) {
			var morseChar = morseMap.get(messageUp.charAt(i));
			morse = morse + morseChar;
		}

		var dateSent = new Date();
		var date = dateSent.getTime();

		const newMessage = {sender: userName, receiver: userName, message: message, morse: morse, date: date};

		const result = db.collection('Messages').insertOne(newMessage);
		const savedMessage = await db.collection('Messages').save(newMessage);
		res.json(newMessage);
		//res.json(savedMessage);
	} catch (err) {
		res.status(500).json({ error: err.message});
	}
});

app.post('/sendmessage', async (req, res, next) =>
{
	try {
		const { message, morse, sender, receiver } = req.body;
		const db = client.db();

		if (message == null)
			return res.status(400).json({ msg: "Error: Message field is empty." });

		if (morse == null)
			return res.status(400).json({ msg: "Error: Morse translation field is empty." });

		if (sender == null)
			return res.status(400).json({ msg: "Error: Sender field is empty." });

		if (receiver == null)
			return res.status(400).json({ msg: "Error: Receiver field is empty." });

		var dateSent = new Date();
		var date = dateSent.getTime();

		const newMessage = {sender: sender, receiver: receiver , message: message, morse: morse, date: date};

		const result = db.collection('Messages').insertOne(newMessage);
		const savedMessage = await db.collection('Messages').save(newMessage);
		res.json(savedMessage);
	} catch (err) {
		res.status(500).json({ error: err.message});
	}
});



//}

// change dfor Heroku deployment
//app.listen(5000); // start Node + Express server on port 5000
app.listen(PORT, () =>
{
  console.log(`Server listening on port ${PORT}.`);
});
