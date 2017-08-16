var mongoose = require("mongoose");
var Festival = require ("./models/festival");
var Comment = require("./models/comment");

var data = [{
    name: "ABC",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "This is ABC"
},{
    name: "PQR",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "This is PQR"
},{
    name: "UVW",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "This is UVW"
}];

function seedDB(){
    Festival.remove({}, function(err){
    if(err){
        console.log("Removed campground");    
    }
    else{
        console.log("Festival removed");
        data.forEach(function(seed){
        Festival.create(seed,function(err, createdFest){
            if(err){
                console.log(err);
            }else{
                console.log("Added data");
                Comment.create({text:"This place is great for music lover",
                 author: "Homer"   
                }, function(err, createdComment){
                    if(err){
                        console.log(err);
                    }else{
                        createdFest.comments.push(createdComment);
                        createdFest.save();
                        console.log("Created campgrounds");
                    }
                });
            }
            
        });
    });
    }
});
    //Add a few festivals
    

    
    
}

module.exports = seedDB;