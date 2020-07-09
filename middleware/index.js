var campground = require("../models/campground")
var comment = require("../models/comments")


var middlewareobj = {}

middlewareobj.checkowner = function (req, res, next) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id).then((e) => {
            if (!e){
                req.flash("error","no permission")
                res.redirect("back")
            }
            if (e.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash("error","no permission")
                res.redirect("back")
            }

        }).catch((e) => {
            req.flash("error","campground not found")
            res.redirect("back")
        })
    } else {
        req.flash("error","you need to be logged in to do that")
        res.redirect("back")
    }
}
middlewareobj.checkcommentowner = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id).then((e) => {
            if (e.author.id.equals(req.user._id)) {
                next()
            } else {
                req.flash("error","no permission")
                res.redirect("back")
            }

        }).catch((e) => {
            req.flash("error",e.message)
            res.redirect("back")
        })
    } else {
        req.flash("error","you need to be logged in to do that")
        res.redirect("back")
    }
}
middlewareobj.isloggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } 
    req.flash("error","you need to be logged in to do that")
    res.redirect("/login")
}

module.exports = middlewareobj