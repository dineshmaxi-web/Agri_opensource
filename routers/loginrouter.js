var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user.js');
var bcrypt = require('bcryptjs');

var isValidPassword = function(user, password){
  return bcrypt.compareSync(password, user.password);
}
var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    done(null, user);
  });
});

router.post('/user/login',
passport.authenticate('local', {failureRedirect: '/my/login'}), function(req, res) {
  res.redirect('/my/dashboard/posts');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({username: username}, function(err, user) {
      if (err) { return done(err); }
       if (!user) { return done(null, false); }
       if (!isValidPassword(user, password)){
         return done(null, false);
         }
        if(user){
          return done(null, user);
        }
 });
}));

module.exports = router;
