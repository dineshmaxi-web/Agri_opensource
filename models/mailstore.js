var mongoose = require('mongoose');

var mailSchema = mongoose.Schema({
  created_at : {type: Date , default:Date.now()},
  productowner : String,
  productname : String,
  productid : String,
  pquantity : Number,
  howmuch : Number,
  pqmeasure : String,
  mobilenumber : Number,
  clickername : String
});

var mailstore = mongoose.model('mailstore' , mailSchema);

module.exports = mailstore;
