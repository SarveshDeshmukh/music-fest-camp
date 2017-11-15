
var mongoose = require("mongoose");
var Comment = require("./comment");

//Festival Schema
var festivalSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    price : String,
    createdAt :{
        type: Date,
        default: Date.now
    },
    author:{
       id :{
           type: mongoose.Schema.Types.ObjectId,
           ref:"User"
       },
       username:String
     },
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Comment"
        }
        ]
});

module.exports = mongoose.model("Festival", festivalSchema);
