var mongoose = require("mongoose");
var Festival = require ("./models/festival");
var Comment = require("./models/comment");

var data = [{
    name: "ABC",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},{
    name: "PQR",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
},{
    name: "UVW",
    image: "https://ultramusicfestival.com/wp-content/uploads/2016/04/miami-2016-og-1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}];

function seedDB(){
    Festival.remove({}, function(err){
    if(err){
        console.log("Removed campground");    
    }
    // else{
    //     console.log("Festival removed");
    //     data.forEach(function(seed){
    //     Festival.create(seed,function(err, createdFest){
    //         if(err){
    //             console.log(err);
    //         }else{
    //             console.log("Added data");
    //             Comment.create({text:"This place is great for music lover",
    //              author: "Homer"   
    //             }, function(err, createdComment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     createdFest.comments.push(createdComment);
    //                     createdFest.save();
    //                     console.log("Created campgrounds");
    //                 }
    //             });
    //         }
            
    //     });
    // });
    // }
});
    //Add a few festivals
    

    
    
}

module.exports = seedDB;