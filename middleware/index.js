var Festival = require("../models/festival");
var Comment = require("../models/comment");

//All the middleware goes here!
var middlewareObj = {};

middlewareObj.checkFestivalOwnership = function(req, res, next){
    if(req.isAuthenticated()){
          
           Festival.findById(req.params.id, function(err, foundFestival){
       if(err || !foundFestival){
           req.flash("error","Festival not found!");
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
               req.flash("error","You don't have permission to do that!");
               res.redirect("back");
           }
           
       }
    });
        
    }else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err || !foundComment){
                  req.flash("error", "Comment not found!");
                  res.redirect("back");
              }else{
                  //checl id user owns the comment
                  if(foundComment.author.id.equals(req.user._id)){
                      next();
                  }else{
                      req.flash("error","You don't have permission to do that!");
                      res.redirect("back");
                  }
              } 
           });
            
        }else{
            req.flash("error","You need to be logged in to do that!");
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}


module.exports = middlewareObj;