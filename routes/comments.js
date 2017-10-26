var express = require("express");
var router = express.Router({mergeParams: true});
var Festival = require("../models/festival");
var Comment = require("../models/comment");

//Add new comment
router.get("/new", isLoggedIn, function(req, res){
    Festival.findById(req.params.id, function(err, festival){
        if(err){
            console.log("PCHHHTT%%%%")
            console.log(err);
        }
        else{
            console.log("I am here!!!")
            res.render("comments/new",{festival: festival});
        }
    });
    
});

//Create comment
router.post("/", isLoggedIn, function(req, res){
    console.log("HEREE!!")
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

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", function (req, res){
    console.log("Here in the edit comment!!!");
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            console.log("NO ERROR!!!");
           res.render("comments/edit", {festival_id : req.params.id, comment: foundComment }); 
        }
    });
    
});

//COMMENT UPDATE
router.put("/:comment_id",function(req, res){
  
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
       if(err){
           res.redirect("back");
       }
       else{
           console.log("Trying to update the comment!!");
           res.redirect("/festivals/"+req.params.id);
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
