var express = require("express")
var router = express.Router({mergeParams:true})
var campground = require("../models/campground")
var comment = require("../models/comments")
var middleware = require("../middleware/index.js")
//new
router.get("/new",  middleware.isloggedin, function (req, res) {
    campground.findById(req.params.id).then(function (e) {
        res.render("./comments/new", { camp: e })
    }).catch(function (e) {
        console.log(e);
    })
})

//create
router.post("/", middleware.isloggedin, function (req, res) {
    campground.findById(req.params.id).then(function (campground) {
        comment.create(req.body.comment).then(function (e) {
            e.author.id = req.user._id
            e.author.username = req.user.username
            console.log("================="+e);
            e.save()
            campground.comments.push(e)
            campground.save()
            req.flash("success","added comment")
            res.redirect("/campgrounds/" + campground._id)
        }).catch(function (e) {
            req.flash("error","something wrong")
            res.redirect("/campgrounds/" + campground._id)
        })
    }).catch(function (e) {
        console.log(e);
        res.redirect("/campgrounds")
    })
})

//edit comment
router.get("/:comment_id/edit", middleware.checkcommentowner,function(req,res){
    
    comment.findById(req.params.comment_id).then(function(foundcomment){
        res.render("./comments/edit",{camp_id:req.params.id,comment:foundcomment})
    }).catch((E)=>{
        req.flash("error",E.message)
        res.redirect("back")
    })
    
})
//comment update
router.put("/:comment_id/edit", middleware.checkcommentowner,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment).then(function(e){
       res.redirect("/campgrounds/"+req.params.id)
    }).catch((E)=>{
        req.flash("error",E.message)
        res.redirect("back")
    })
    
})
router.delete("/:comment_id", middleware.checkcommentowner,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id).then((e)=>{
        req.flash("success","delete success")
        res.redirect("/campgrounds/"+req.params.id)
    }).catch((e)=>{
        req.flash("error",e.message)
res.redirect("back")
    })
})

//middleware


module.exports = router