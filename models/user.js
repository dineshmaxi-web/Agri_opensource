var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username : String,
  password : String
});

var user = mongoose.model('users' , userSchema);

module.exports = user;
