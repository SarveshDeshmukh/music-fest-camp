var express = require("express");
var router = express.Router();
var Festival = require("../models/festival");
var Comment = require("../models/comment");

//Add new comment
router.get("/festivals/:id/comments/new", isLoggedIn, function(req, res){
    Festival.findById(req.params.id, function(err, festival){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{festival: festival});
        }
    });
    
});

//Create comment
router.post("/festivals/:id/comments", isLoggedIn, function(req, res){
    //Lookup festival using ID
    Festival.findById(req.params.id, function(err, festival){
        if(err){
            console.log(err);
        }else{
    //Create a comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //Save comment
                    comment.save();
                    festival.comments.push(comment);
                    festival.save();
                    res.redirect("/festivals/"+festival._id);
                }
           });
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
