var express = require('express');
const passport = require("passport")
const User = require('../models/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signup',async (req, res)=>{
  try {
    const{username, email, profilePicture, password} = req.body;

    const newUser = new user({username, email, profilePicture});

    const registeredUser = await user.register(newUser, password);
    
    res.send("User registered successfully!");

  } catch(e) {
    res.send(e.message);
  }
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
}))

module.exports = router;
