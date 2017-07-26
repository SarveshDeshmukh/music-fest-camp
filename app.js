var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/festivals", function(req, res){
    var festivals = [
            {name: "UMF", image: "https://farm4.staticflickr.com/3939/32084181014_0011343533.jpg"},
            {name: "Tomorrowland", image: "https://farm1.staticflickr.com/523/32581377422_aa3065b707.jpg"},
            {name: "Rock in Rio", image: "https://farm8.staticflickr.com/7111/7134797481_442e2a70a1.jpg"}
        ];
        res.render("festivals", {festivals : festivals});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Music Festival Camp has started!!!");
});