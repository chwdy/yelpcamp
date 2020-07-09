var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true })

var campgroundschema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        username:String
    }
})


// campground.create([{
//     name: "salmon creek",
//     "image": "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "test description"
// },
// {
//     name: "forest hill",
//     image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "test description"
// },
// {
//     name: "prospect park",
//     image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "test description"
// },
// {
//     name: "prospect park",
//     image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "test description"
// },
// {
//     name: "prospect park",
//     image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "test description"
// }]).then(function (e) {
//     console.log("success");

// }).catch(function (e) {
//     console.log("error", e);
// })

module.exports = mongoose.model("Campground", campgroundschema)