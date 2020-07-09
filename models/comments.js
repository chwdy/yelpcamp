var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true })

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