const express = require("express");
const passport = require("passport");
const User = require("./models/user");
const router = express.Router();

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/",function(req,res){
  if(req.isAuthenticated()){
    console.log("logined")
    res.sendFile(__dirname+"/views/index.html");
    // res.render("index",{user:req.user});
  }else{
    console.log("nologin")
    User.find().sort({createAt:"descending"})
    .exec(function(err,users){
      if(err){return next(err);}
      res.sendFile(__dirname+"/views/index_nologin.html");
      // res.render("index_nologin",{users:users});
    });
  }
});


router.get("/signup",function(req,res){
  console.log("signup page")
  res.sendFile(__dirname+"/views/signup.html");
});


router.post("/signup",function(req,res,next){
  console.log("signup req")
  var username = req.body.username;
  var password = req.body.password;
  console.log(username)
  console.log(password)
  User.findOne({username:username},function(err,user){
    if(err){return next(err);}
    if(user){
      req.flash("error","사용자가 이미 있습니다.");
      return res.redirect("/signup");
    }
    var newUser = new User({
      username:username,
      password:password
    });
    newUser.save(next);
  });
},passport.authenticate("login",{
  successRedirect:"/",
  failureRedirect:"/signup",
  failureFlash:true
}));


router.get("/users/:username",function(req,res,next){
  User.findOne({username:req.params.username},function(err,user){
    if(err) {return next(err);}
    if(!user){return next(404);}
    res.render("profile",{user:user});
  });
});


router.get("/login",function(req,res){
  console.log("login page")
  res.sendFile(__dirname+"/views/login.html");
});


router.post("/login",passport.authenticate("login",{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash : true
}));


router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});


function ensureAuthenticated(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    req.flash("info","먼저 로그인해야 이 페이지를 볼 수 있습니다.");
    res.redirect("/login");
  }
}


router.get("/edit",ensureAuthenticated,function(req,res){
  res.render("edit");
});

//put메서드는 현재 html에서 get post만 되니까 post로 일단 구현
router.post("/edit",ensureAuthenticated,function(req,res,next){
  req.user.displayName = req.body.displayname;//고쳐야 할 부분입니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  req.user.bio = req.body.bio;//고쳐야 할 부분입니다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  req.user.save(function(err){
    if(err){next(err);return;}
    req.flash("info","Profile updated!");
    res.redirect("/edit");
  });
});

module.exports = router;
