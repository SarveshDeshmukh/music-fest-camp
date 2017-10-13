var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var Festival = require("../models/festival");


//index route    
router.get("/", function(req, res){
    //Get all festivals from DB
    Festival.find({}, function(err, allFestivals){
        if(err){
            
        }else{
            res.render("festivals/index", {festivals: allFestivals});
        }
    });
    
});

    //CREATE Route add new festival to database
router.post("/", isLoggedIn, function(req, res){
    
    //Get the form data
    var festName = req.body.festName;
    var festImg = req.body.festImg;
    var description = req.body.festDescription;
    var newFest = {name :festName, image : festImg, description : description};
    
    //Create a new festival and save to database;
    
    Festival.create(newFest, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //Redirect back to festivals
             res.redirect("/festivals");
        }
    });
});

    //show form to create new festival
router.get("/new",isLoggedIn, function(req, res){
    res.render("festivals/new");
});



    //SHOW - shows more info about one festival
router.get("/:id", function(req, res){
    //Find the festival with provided ID
    Festival.findById(req.params.id).populate("comments").exec(function(err, foundFestival){
        if(err){
            console.log(err);
        }else{
            //render show template with that festival
            res.render("festivals/show",{festival : foundFestival});
        }
    });
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;