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
router.get("/new", isLoggedIn, function(req, res){
    res.render("festivals/new");
});

    //Edit campground route
router.get("/:id/edit", isOwner, function(req, res){
            console.log("INSIDE EDIT FESTIVAL")
           Festival.findById(req.params.id, function(err, foundFestival){
            res.render("festivals/edit", {festival : foundFestival});
    });
});    
    //Update campground route
router.put("/:id", isOwner, function(req, res){
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
router.delete("/:id", isOwner, function(req, res){
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

function isOwner(req, res, next){
    if(req.isAuthenticated()){
           console.log("^^^^In authenticatino isOwner" + req.user._id);
           Festival.findById(req.params.id, function(err, foundFestival){
       if(err){
           res.redirect("back");
       }
       else{
           //Does the user owns teh festival
           //console.log(foundFestival.author.id);
           //console.log(req.user._id)
           //if(foundFestival.author.id === req.user._id)
           //Use .equals() because foundFestival.author.id is an object and req.user_id is a string! Result will be true!
           
           if(foundFestival.author.id.equals(req.user._id)){
               next();
               //res.render("festivals/edit", {festival : foundFestival});
           }else{
               res.redirect("back");
           }
           
       }
    });
        
    }else{
        res.redirect("back");
    }
        //Does user own the festival
        //Let user run this code
        //Otherwise, redirect
    //if not, redirect
    
}

module.exports = router;