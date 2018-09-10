var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  created_by : String,
  created_at : {type: Date , default:Date.now()},
  pimage : String,
  posteremail : String,
  pname : String,
  pprice : Number,
  pquantity :  Number,
  pqmeasure : String,
  pnumber : Number,
  pdescription : String,
  street : String,
  city : String,
  pincode : Number,
  lat : String,
  lng : String
});

var product = mongoose.model('products' , productSchema);

module.exports = product;
