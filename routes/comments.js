var express = require("express");
var router = express.Router({mergeParams: true});
var Festival = require("../models/festival");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Add new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //Lookup festival using ID
    Festival.findById(req.params.id, function(err, festival){
        if(err){
            console.log(err);
        }else{
    //Create a comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
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
                    req.flash("success","Successfully added comment!");
                    res.redirect("/festivals/"+festival._id);
                }
           });
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res){
    console.log("Here in the edit comment!!!");
    Festival.findById(req.params.id, function(err, foundFestival){
        if(err || !foundFestival){
            req.flash("error", "No Festival found!");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            console.log("NO ERROR!!!");
           res.render("comments/edit", {festival_id : req.params.id, comment: foundComment }); 
        }
    });
  });
   
});

//COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  
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

//COMMENT DESTROY

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           req.flash("success","Comment deleted! ");
           res.redirect("/festivals/"+req.params.id);
       }
    });
});

//middleware

module.exports = router;
