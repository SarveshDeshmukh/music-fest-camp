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
    var author = {
        id: req.user._id,
        username : req.user.username,
    }
    var newFest = {name :festName, image : festImg, description : description, author : author};
    
    //Create a new festival and save to database;
    
    Festival.create(newFest, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            //Redirect back to festivals
             res.redirect("/festivals");
        }
    });
});

    //show form to create new festival
router.get("/new",isLoggedIn, function(req, res){
    res.render("festivals/new");
});

    //Edit campground route
router.get("/:id/edit", function(req, res){
    Festival.findById(req.params.id, function(err, foundFestival){
       if(err){
           res.redirect("/festivals");
       }
       else{
           res.render("festivals/edit", {festival : foundFestival});
       }
    });
    
});    
    //Update campground route
router.put("/:id", function(req, res){
    // Find and update the correct festival
    console.log("Festival name is "+ req.body.festival.festName);
    Festival.findByIdAndUpdate(req.params.id, req.body.festival, function(err, updatedFestival){
        if(err){
        res.redirect("/festivals");
        }else{
           console.log("ID from the db is" + updatedFestival._id);
            res.redirect("/festivals/"+ req.params.id);
        }
    });
    //Redirect to show page!
});

    //SHOW - shows more info about one festival
router.get("/:id", function(req, res){
    console.log("**********");
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


//DESTROY Festival route
router.delete("/:id", function(req, res){
    Festival.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/festivals");    
        }else{
            res.redirect("/festivals");   
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