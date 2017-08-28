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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
  failureRedirect:"/login"
}) 
,function(req, res){
    
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/festivals");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
