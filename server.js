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
var chat = require('./models/chat.js');
var mailstore = require('./models/mailstore.js');
var nodemailer = require('nodemailer');
var socket = require('socket.io');
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

app.get('/my/dashboard/posts',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/dashboardpost/dashboardpost.html'));
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

app.get('/my/map',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/map/map.html'));
});

app.get('/my/mandi',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/mandi/mandi.html'));
});

app.post('/sell/product',verify,function(req,res){
  var newProduct = new product();
  newProduct.created_by = req.user.username;
  newProduct.pname = req.body.pname.toLowerCase();
  newProduct.pimage = req.body.imageurl;
  newProduct.posteremail = req.user.email;
  newProduct.pprice = req.body.pprice;
  newProduct.pquantity = req.body.pquantity;
  newProduct.pqmeasure = req.body.pqmeasure;
  newProduct.pnumber = req.user.phonenumber;
  newProduct.pdescription = req.body.pdescription;
  newProduct.street = req.body.street;
  newProduct.city = req.body.city;
  newProduct.state = req.body.state;
  newProduct.pincode = req.body.pincode;
  newProduct.lat = req.body.lat;
  newProduct.lng = req.body.lng;
  newProduct.save(function(err,savedObject){
      if(savedObject)
      {
        res.redirect('/my/dashboard/posts')
      }
      else {
        res.send(err);
      }
    });
});

app.get('/my/products/detail/:id',verify,function(req,res){
  product.find({_id: req.params.id},function(err, product){
    res.render('details', {prod : product , traderemail : req.user.email, username : req.user.username})
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

app.post('/yesupdate/:id/:updatedquantity/mail/',verify,function(req,res){

  product.findOneAndUpdate({_id: req.params.id},{$set:{pquantity:req.params.updatedquantity}},{"returnNewDocument": true},function(err,updated){

  });

  mailstore.findOneAndDelete({productid: req.params.id},function(err, deleteditem){
    res.redirect('/my/dashboard/posts')
  });
});

app.post('/noupdate/:id/:updatedquantity/mail/',verify,function(req,res){
  mailstore.findOneAndDelete({productid: req.params.id},function(err, deleteditem){
    res.redirect('/my/dashboard/posts');
  });
});

app.get('/get/mail',verify,function(req,res){
  console.log(req.user.username);
  if(req.user.username)
    {
     mailstore.find({productowner: req.user.username},function(err, mailstore){
       res.send(mailstore);
      if(err)
        res.send("Nothing found.");
      });
    }
  else{
    res.send("You are not authenticated");
  }
});

app.post('/mail/send',function(req,res){
  var newMailStore = new mailstore();
  newMailStore.productowner = req.body.postername;
  newMailStore.productname = req.body.product.toLowerCase();
  newMailStore.productid = req.body.productid;
  newMailStore.howmuch = req.body.howmuch;
  newMailStore.pquantity = req.body.pquantity;
  newMailStore.pqmeasure = req.body.pqmeasure;
  newMailStore.mobilenumber = req.body.mobileno;
  newMailStore.clickername = req.user.username;

  newMailStore.save(function(err,savedObject){
      if(savedObject)
      {
        console.log(savedObject);
      }
      else {
        res.send(err);
      }
    });

  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dineshozian@gmail.com',
      pass: 'ozian111'
    }
  });

  mailOption = {
    from: 'Website support <dineshozian@gmail.com>',
    to: req.body.posteremail,
    subject: req.body.subject,
    html: '<p>Hello, <b>'+ req.body.postername+'</b>. How are you?. <b>'+req.user.username+'</b> would like to buy your <b>'+req.body.howmuch+' '+req.body.pqmeasure+' '+req.body.product+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.user.username+' to '+req.user.phonenumber+'</li></ul>'
  };
 transporter.sendMail(mailOption,function(info, err){
   if(info){
    console.log(info.message);
   }
 });

 transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: 'dineshozian@gmail.com',
     pass: 'ozian111'
   }
 });

 mailOption = {
   from: 'Website support <dineshozian@gmail.com>',
   to: req.body.clickeremail,
   subject: req.body.subject,
   html: '<p>Hello, <b>'+ req.user.username+'</b>. How are you?. I hope you are interested in buying the <b>'+req.body.howmuch+' '+req.body.pqmeasure+' '+req.body.product+'</b> from <b>'+req.body.postername+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.body.postername+' to '+req.body.mobileno+'</li></ul>'
 };
transporter.sendMail(mailOption,function(info, err){
  if(info){
   console.log(info.message);
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

app.get('/get/product/search/name/:name',verify,function(req,res){
  product.find({pname: req.params.name.toLowerCase()},function(err, product){
     res.send(product);
    if(err)
      res.send("product not found.");
});
});

app.get('/get/product/search/location/:loc',verify,function(req,res){
  product.find({city: req.params.loc},function(err, product){
     res.send(product);
    if(err)
      res.send("product not found.");
});
});

app.get('/get/product/search/price/:cond/:pri',verify,function(req,res){
  if(req.params.cond != null)
  {
    if(req.params.cond == "Greaterthan")
    {
     product.find({pprice:{$gt:req.params.pri}},function(err, product){
     res.send(product);
    });
    }
    if(req.params.cond == "Lessthan")
    {
     product.find({pprice:{$lte:req.params.pri}},function(err, product){
     res.send(product);
    });
    }
   }
});

app.post('/my/products/detail/:id/delete',verify,function(req,res){
  product.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/my/dashboard/posts')
  });
});

app.get('/account/logout',verify,function(req,res){
  req.session.destroy();
  req.logout();
  res.redirect('/my/login');
});

var server = app.listen(4000,function(){
  console.log("server is listening on port 4000...");
});

var io = socket(server);
io.on('connection', (socket) => {
   socket.on('chat', function(data){
       var newChat = new chat();
       newChat.created_by = data.user;
       newChat.message = data.message;
       newChat.prodid = data.productid;
       newChat.save();
       io.sockets.emit('chat', data);
   });
});

app.get('/get/chat',verify, function(req,res){
  chat.find({},function(err, obj){
    res.send(obj);
  });
});
