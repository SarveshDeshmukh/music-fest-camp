var express      = require("express"), 
    app          = express(), 
    bodyParser   = require("body-parser"), 
    mongoose     = require("mongoose");

mongoose.connect("mongodb://localhost/music_fest_camp", {useMongoClient : true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Schema Setup

var festivalSchema = new mongoose.Schema({
    name : String,
    image : String
});

var Festival = mongoose.model("Festival", festivalSchema);

/*Festival.create(
    {   name: "Tomorrowland", 
        image: "https://farm1.staticflickr.com/523/32581377422_aa3065b707.jpg"
        
    }, function(err, festival){
       if(err){
           console.log(err);
       }
       else{
           console.log("Newly created festival: ");
           console.log(festival);
       }
    });
*/

app.get("/", function(req, res){
    res.render("landing");
});

        
app.get("/festivals", function(req, res){
    //Get all festivals from DB

    Festival.find({}, function(err, allFestivals){
        if(err){
            
        }else{
            res.render("festivals", {festivals: allFestivals})
        }
    });
    
});

app.post("/festivals", function(req, res){
    
    //Get the form data
    var festName = req.body.festName;
    var festImg = req.body.festImg;
    var newFest = {name :festName, image : festImg};
    
    //Create a new festival and save to database;
    
    Festival.create(newFest, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //Redirect back to festivals
             res.redirect("/festivals");
        }
    });
});

app.get("/festivals/new", function(req, res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Music Festival Camp has started!!!");
});