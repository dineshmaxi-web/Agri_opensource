var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var registerrouter = require('./routers/registerrouter');
var loginrouter = require("./routers/loginrouter");
var mongoose = require('mongoose');
var path = require('path');
var product = require('./models/product.js');
var user = require('./models/user.js');
var nodemailer = require('nodemailer');
var app = express();
app.locals.moment = require('moment');

mongoose.connect('mongodb://ram:ram@ds117739.mlab.com:17739/login');
app.use(express.static(__dirname + "/public"));

app.set("view engine", "pug");

app.use(session({secret:"secret",resave: true,saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(registerrouter);
app.use(loginrouter);

function verify(req,res,next){
  if(req.isAuthenticated())
  {
    return next();
  }
  else {
    {
      res.redirect('/my/login');
    }
  }
}

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/splashscreen/splashscreen.html'));
});

app.get('/my/dashboard',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/dashboard/dashboard.html'));
});

app.get('/my/login',function(req,res){
  res.sendFile(path.join(__dirname+'/public/login/login.html'));
});

app.get('/my/products',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/product/product.html'));
});

app.get('/my/sell',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/sell/sell.html'));
});

app.post('/sell/product',verify,function(req,res){
  var newProduct = new product();
  newProduct.created_by = req.user.username;
  newProduct.pname = req.body.pname.toLowerCase();
  newProduct.pprice = req.body.pprice;
  newProduct.pquantity = req.body.pquantity;
  newProduct.pqmeasure = req.body.pqmeasure;
  newProduct.pnumber = req.body.pnumber;
  newProduct.pdescription = req.body.pdescription;
  newProduct.street = req.body.street;
  newProduct.city = req.body.city;
  newProduct.state = req.body.state;
  newProduct.pincode = req.body.pincode;
  newProduct.save(function(err,savedObject){
      if(savedObject)
      {
        res.redirect('/my/products')
      }
      else {
        res.send(err);
      }
    });
});

app.get('/my/products/detail/:id',verify,function(req,res){
  product.find({_id: req.params.id},function(err, product){
    res.render('details', { prod : product , traderemail : req.user.email})
});
});

app.get('/get/product',verify,function(req,res){
      product.find({},function(err, product){
        if(err)
          res.send(err);
        else
          res.send(product);
      });
});

app.post('/mail/send',function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dineshsmart101.dm@gmail.com',
      pass: 'australian111'
    }
  });

  var mailOption = {
    from: 'dineshsmart101@gmail.com',
    to: req.body.emailid,
    subject: req.body.subject,
    html: '<ul'+'<li>Mobile number : '+req.body.mobileno+'</li>'+'</ul>'
  };
 transporter.sendMail(mailOption,function(info, err){
   if(info){
    console.log(info.message);
   }
   if(err) {
     console.log(err);
   }
 });
});

app.get('/post/dashboard',verify,function(req,res){
  product.find({created_by: req.user.username},function(err, product){
     res.send(product);
    if(err)
      res.send("product not found.");
});
});

app.get('/get/product/search/:name',verify,function(req,res){
  console.log(req.params.name);
  product.find({pname: req.params.name.toLowerCase()},function(err, product){
     res.send(product);
    if(err)
      res.send("product not found.");
});
});

app.post('/my/products/detail/:id/delete',verify,function(req,res){
  if(req.user.username === req.body.uname)
  {
  product.findOneAndDelete({_id: req.body.pid},function(err, pro){
    if(pro)
      res.send(pro);
    if(err)
      res.send(err);
  });
  }
});

app.get('/account/logout',verify,function(req,res){
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

app.listen(8080,function(){
  console.log("server is listening on port 8080...");
});
