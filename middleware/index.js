var campground = require("../models/campground")
var comment = require("../models/comments")


var middlewareobj = {}

middlewareobj.checkowner = function (req, res, next) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id).then((e) => {
            if (e.author.id.equals(req.user._id)) {
                next()
            } else {
                res.redirect("back")
            }

        }).catch((e) => {
            res.redirect("back")
        })
    } else {
        res.redirect("back")
    }
}
middlewareobj.checkcommentowner = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id).then((e) => {
            if (e.author.id.equals(req.user._id)) {
                next()
            } else {
                res.redirect("back")
            }

        }).catch((e) => {
            res.redirect("back")
        })
    } else {
        res.redirect("back")
    }
}
middlewareobj.isloggedin = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = middlewareobj