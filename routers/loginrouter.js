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
passport.authenticate('local', {failureRedirect: '/my/login'}), function(req, res) {
  console.log(req.user.username);
  res.redirect(`/my/dashboard/posts`);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    user.findOne({username: username , password: password}, function(err, user) {
      if (!user || !password)
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
