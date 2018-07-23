var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  created_by : String,
  created_at : {type: Date , default : Date.now()},
  pname : String,
  pprice : Number,
  pquantity :  Number,
  pqmeasure : String,
  pnumber : Number,
  pdescription : String,
  street : String,
  city : String,
  state : String,
  pincode : Number
});

var product = mongoose.model('products' , productSchema);

module.exports = product;
