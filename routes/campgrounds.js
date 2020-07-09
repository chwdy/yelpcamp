var express = require("express")
var router = express.Router()
var campground = require("../models/campground")
var comment = require("../models/comments")
var middleware = require("../middleware/index.js")
router.get("/", function (req, res) {
    campground.find({}).then(function (e) {
        console.log("result length: " + e.length);
        //console.log(e);
        res.render("./campgrounds/index", { campgrounds: e })
    }).catch(function (err) {
        console.log(err);
    })

})

//create
router.post("/",middleware.isloggedin, function (req, res) {
    var name = req.body.name
    var img = req.body.img
    var des = req.body.description
    var price = req.body.price
    var newcamp = { name: name, image: img, description: des }
    newcamp.author = { id: req.user.id, username: req.user.username ,price:price}
    campground.create(newcamp).then(function (e) {
        console.log("success");
        req.flash("success","successed!")
    }).catch(function (e) {
        console.log(e);
    }).finally(function () {
        res.redirect("/campgrounds")
    })
})
//new
router.get("/new", middleware.isloggedin, function (req, res) {

    res.render("./campgrounds/new")
})
router.get("/:id", function (req, res) {
    campground.findById(req.params.id).populate("comments").then(function (e) {
        res.render("./campgrounds/show", { campground: e })
    }).catch(function (e) {
        req.flash("error",e.message)
        res.redirect("back")
    })

})

//edit
router.get("/:id/edit", middleware.checkowner,function (req, res) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id).then((e) => {
            
            if(e.author.id.equals( req.user._id)){
                res.render("campgrounds/edit", { camp: e })
            }else{
                res.redirect("/campgrounds/"+req.params.id)
            }
            
        }).catch((e) => {
            req.flash("error",e.message)

            res.redirect("/campgrounds")
        })
    } else {
        res.redirect("/campgrounds/"+req.params.id)
    }

})
//edit submit
router.put("/:id/edit", middleware.checkowner,function (req, res) {
    campground.findByIdAndUpdate(req.params.id, req.body.camp).then((e) => {
        res.redirect("/campgrounds/" + req.params.id)
    }).catch((e) => {
        res.redirect("/campgrounds")
    })
})

//delete
router.delete("/:id",middleware.checkowner,function (req, res) {
    campground.findOneAndRemove(req.params.id, (e, removed) => {

        comment.deleteMany({ _id: { $in: removed.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });
    }).catch((e) => {
        res.redirect("/campgrounds")
    })
})




module.exports = router
