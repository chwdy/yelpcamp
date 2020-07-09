var express = require("express")
var bodyparser = require("body-parser")
var app = express()
var mongoose = require("mongoose")
var seeddb = require("./seeds")
var passport = require("passport")
var localstrategy = require("passport-local")
var methodoverride = require("method-override")

var commentroute = require("./routes/comments")
var campgroundroute = require("./routes/campgrounds")
var indexroute = require("./routes/index")



mongoose.connect("mongodb://localhost/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyparser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodoverride("_method"))


var campground = require("./models/campground")
var comment = require("./models/comments")
var user = require("./models/user")

//seeddb()
//====
//passport configure
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())
app.use(function (req, res, next) {
    res.locals.currentuser = req.user
    next();
})

//============
//routes
app.use("/campgrounds/:id/comments",commentroute)
app.use("/campgrounds",campgroundroute)
app.use(indexroute)


app.listen(3000)