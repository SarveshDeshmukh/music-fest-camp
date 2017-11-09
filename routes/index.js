var express = require("express");
var router = express.Router();

var Festival = require("../models/festival");
var Comment = require("../models/comment");
var passport = require("passport");
var User    = require("../models/user");


//Root route
router.get("/", function(req, res){
    res.render("landing");
});

//show Register form
router.get("/register", function(req, res){
    res.render("register");
})

//Handle sign up logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}),req.body.password,function(err, user){
        if(err){
           /* req.flash("error", err);
            return res.render("register");*/
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to Music Festival Camp "+ user.username);
            res.redirect("/festivals");
        });
        
    });
});

//Show login form

router.get("/login", function(req, res){
   res.render("login"); 
});

//Handle login logic
router.post("/login", passport.authenticate("local",
{ successRedirect:"/festivals",
  failureRedirect:"/login",
  failureFlash :true
}) 
,function(req, res){
    
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/festivals");
});

module.exports = router;
