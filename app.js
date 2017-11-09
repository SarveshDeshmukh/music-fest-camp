var express      = require("express"), 
    app          = express(), 
    bodyParser   = require("body-parser"), 
    mongoose     = require("mongoose"),
    Festival     = require("./models/festival"),
    Comment      = require("./models/comment"),
    flash        = require("connect-flash"),
    passport     = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy= require("passport-local"),
    User         = require("./models/user"),
    seedDB       = require("./seeds");

var commentRoutes  = require("./routes/comments"),
    festivalRoutes = require("./routes/festivals"),
    indexRoutes = require("./routes/index");
    
//seedDB(); //seed the database
mongoose.connect("mongodb://localhost/music_fest_camp", {useMongoClient : true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Requiring routes
app.use("/", indexRoutes);
app.use("/festivals/:id/comments",commentRoutes);
app.use("/festivals",festivalRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Music Festival Camp has started!!!");
});