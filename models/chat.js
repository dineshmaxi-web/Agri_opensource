var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
  created_by : String,
  created_at : {type: Date , default:Date.now()},
  message : String,
  prodid : String
});

var chat = mongoose.model('chats' , chatSchema);

module.exports = chat;
