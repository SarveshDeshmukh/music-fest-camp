var express      = require("express"), 
    app          = express(), 
    bodyParser   = require("body-parser"), 
    mongoose     = require("mongoose"),
    Festival     = require("./models/festival"),
    Comment      = require("./models/comment"),
    passport     = require("passport"),
    LocalStrategy= require("passport-local"),
    User         = require("./models/user"),
    seedDB       = require("./seeds");
    
seedDB();
mongoose.connect("mongodb://localhost/music_fest_camp", {useMongoClient : true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ "/public"));

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Arsenal is the best club",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Schema Setup
app.get("/", function(req, res){
    res.render("landing");
});

    //INDEX route -     
app.get("/festivals", function(req, res){
    //Get all festivals from DB

    Festival.find({}, function(err, allFestivals){
        if(err){
            
        }else{
            res.render("festivals/index", {festivals: allFestivals});
        }
    });
    
});

    //CREATE Route add new festival to database
app.post("/festivals", function(req, res){
    
    //Get the form data
    var festName = req.body.festName;
    var festImg = req.body.festImg;
    var description = req.body.festDescription;
    var newFest = {name :festName, image : festImg, description : description};
    
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

    //show form to create new festival
app.get("/festivals/new", function(req, res){
    res.render("festivals/new");
});



    //SHOW - shows more info about one festival
app.get("/festivals/:id", function(req, res){
    //Find the festival with provided ID
    Festival.findById(req.params.id).populate("comments").exec(function(err, foundFestival){
        if(err){
            console.log(err);
        }else{
            //render show template with that festival
            res.render("festivals/show",{festival : foundFestival});
        }
    });
    
});

//=================
//COMMENT ROUTES
//================

app.get("/festivals/:id/comments/new", function(req, res){
    Festival.findById(req.params.id, function(err, festival){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{festival: festival});
        }
    });
    
});

app.post("/festivals/:id/comments", function(req, res){
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
                    festival.comments.push(comment);
                    festival.save();
                    res.redirect("/festivals/"+festival._id);
                }
           });
        }
    });
});

//===========
//AUTH ROUTES
//===========

//show Register form
app.get("/register", function(req, res){
    res.render("register");
})

//Handle sign up logic
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}),req.body.password,function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/festivals");
        });
        
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Music Festival Camp has started!!!");
});