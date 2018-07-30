var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username : {type: String, unique: true},
  password : String,
  phonenumber : {type: Number,unique: true},
  email : {type: String,unique: true}
});

var user = mongoose.model('users' , userSchema);

module.exports = user;
