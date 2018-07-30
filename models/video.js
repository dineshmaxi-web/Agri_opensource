var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
  videonum : String,
  created_by : String,
  created_at : {type: Date , default:Date.now()},
});

var video = mongoose.model('videos' , videoSchema);

module.exports = video;
