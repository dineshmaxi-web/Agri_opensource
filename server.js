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
var video = require('./models/video.js');
var chat = require('./models/chat.js');
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

app.get('/my/videos',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/video/video.html'));
});

app.get('/my/dashboard/videos',verify,function(req,res){
  res.sendFile(path.join(__dirname+'/public/dashboardvideo/dashboardvideo.html'));
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
  newProduct.latlon = req.body.googlemap;
  newProduct.save(function(err,savedObject){
      if(savedObject)
      {
        console.log(savedObject);
        res.redirect('/my/products')
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

app.post('/mail/send',function(req,res){
  transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'dineshsmart101.dm@gmail.com',
      pass: 'australian111'
    }
  });

  mailOption = {
    from: 'Website support <dineshsmart101@gmail.com>',
    to: req.body.posteremail,
    subject: req.body.subject,
    html: '<p>Hello, <b>'+ req.body.postername+'</b>. How are you?. <b>'+req.user.username+'</b> would like to buy your <b>'+req.body.product+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.user.username+' to '+req.user.phonenumber+'</li></ul>'
  };
 transporter.sendMail(mailOption,function(info, err){
   if(info){
    console.log(info.message);
   }
 });

 transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: 'dineshsmart101.dm@gmail.com',
     pass: 'australian111'
   }
 });

 mailOption = {
   from: 'Website support <dineshsmart101@gmail.com>',
   to: req.body.clickeremail,
   subject: req.body.subject,
   html: '<p>Hello, <b>'+ req.user.username+'</b>. How are you?. I hope you are interested in buying the <b>'+req.body.product+'</b> from <b>'+req.body.postername+'</b>. Please, have a smooth relationship with him/her.</p>'+'<ul>'+'<li>Contact '+req.body.postername+' to '+req.body.mobileno+'</li></ul>'
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
  console.log(req.user.username,req.body.uname);
  if(req.user.username === req.body.uname)
  {
  product.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.send("hello");
  });
  }
  else {
    res.redirect('/my/products/detail/'+req.params.id+'/delete')
  }
});

app.post('/post/videos',function(req,res){
  var newVideo = new video();
  newVideo.created_by = req.user.username;
  newVideo.videonum = req.body.vid;
  newVideo.save(function(err,savedObject){
      if(savedObject)
      {
        res.send(savedObject);
      }
      else {
        res.send(err);
      }
    });
});

app.get('/get/videos',verify,function(req,res){
  video.find({},function(err, video){
     res.send(video);
    if(err)
      res.send("product not found.");
});
});

app.get('/video/dashboard',verify,function(req,res){
  video.find({created_by: req.user.username},function(err, video){
     res.send(video);
    if(err)
      res.send("video not found.");
});
});

app.post('/my/video/:id/delete',verify,function(req,res){
  video.findOneAndDelete({_id: req.params.id},function(deleteditem){
    res.redirect('/my/dashboard/videos');
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
       newChat.save();
       io.sockets.emit('chat', data);
   });
});

app.get('/get/chat',verify, function(req,res){
  chat.find({},function(err, obj){
    console.log(obj);
    res.send(obj);
  });
});
