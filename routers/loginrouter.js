var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('../models/user.js');
var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, user) {
    done(null, user);
  });
});

router.post('/user/login',
passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
  res.redirect(`/my/dashboard`);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({username: username}, function(err, user) {
      if (!user)
       {
         return done(null, false);
       }
       else
        {
          return done(null, user);
        }
   });
  }
));

module.exports = router;
