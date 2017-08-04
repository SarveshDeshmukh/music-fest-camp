var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("landing");
});

var festivals = [
            {name: "UMF", image: "https://farm4.staticflickr.com/3939/32084181014_0011343533.jpg"},
            {name: "Tomorrowland", image: "https://farm1.staticflickr.com/523/32581377422_aa3065b707.jpg"},
            {name: "Rock in Rio", image: "https://farm8.staticflickr.com/7111/7134797481_442e2a70a1.jpg"},
            {name: "UMF", image: "https://farm4.staticflickr.com/3939/32084181014_0011343533.jpg"},
            {name: "Tomorrowland", image: "https://farm1.staticflickr.com/523/32581377422_aa3065b707.jpg"},
            {name: "Rock in Rio", image: "https://farm8.staticflickr.com/7111/7134797481_442e2a70a1.jpg"},
             {name: "UMF", image: "https://farm4.staticflickr.com/3939/32084181014_0011343533.jpg"},
            {name: "Tomorrowland", image: "https://farm1.staticflickr.com/523/32581377422_aa3065b707.jpg"},
            {name: "Rock in Rio", image: "https://farm8.staticflickr.com/7111/7134797481_442e2a70a1.jpg"}
        ];
        
app.get("/festivals", function(req, res){
    
        res.render("festivals", {festivals : festivals});
});

app.post("/festivals", function(req, res){
    
    //Get the form data
    var festName = req.body.festName;
    var festImg = req.body.festImg;
    var newFest = {name :festName, image : festImg};
    //Push into the festivals array
    
    festivals.push(newFest);
    res.redirect("/festivals");
});

app.get("/festivals/new", function(req, res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Music Festival Camp has started!!!");
});