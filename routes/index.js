var express = require("express")
var router = express.Router()
var passport = require("passport")
var user = require("../models/user")


//root
router.get("/", function (req, res) {
    res.render("landing")
})

//register

router.get("/register", function (req, res) {
    res.render("register")
})
router.post("/register", function (req, res) {
    user.register(new user({ username: req.body.username }), req.body.password).then((e) => {
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds")
        })
    }).catch((e) => {
        console.log(e);
        res.redirect("register")

    })
})


//login
router.get("/login", (req, res) => {
    res.render("login")
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    console.log("login post process finished");

})


//logout
router.get("/logout", (req, res) => {
    req.logOut()
    res.redirect("/campgrounds")
})



module.exports = router