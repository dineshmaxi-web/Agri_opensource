var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var bcrypt = require('bcryptjs');

router.post('/user/register', function(req,res){
 var newUser = new user();
 newUser.username = req.body.username;
 newUser.email = req.body.email;
 newUser.phonenumber = req.body.phonenum;
bcrypt.genSalt(10, function(err, salt) {
 if (err) return next(err);
 bcrypt.hash(req.body.password, salt, function(err, hash) {
   if (err) return next(err);
   newUser.password = hash;
   newUser.save(function(err,savedObject){
       if(savedObject)
       {
         console.log(savedObject);
         res.redirect('/my/login');
       }
       else {
         res.send("Username and email and phonenumber must be unique.");
       }
     });
  });
});
});

module.exports = router;
