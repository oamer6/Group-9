// Collects express router.
const router = require('express').Router();
// Require mongoose model.
let User = require('../models/user.model');

// First route - handles incoming HTTP 'get' requests.
// Returns in json format, the users or an error.
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Second route - handles post HTTP requests.
// Create new user and return in json with "User added!".
// Or print the error.
router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
