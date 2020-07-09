var mongoose = require("mongoose")

var commentsschema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        username:String
    }
})


module.exports = mongoose.model("Comment",commentsschema)