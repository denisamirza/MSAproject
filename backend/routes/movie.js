const express = require("express")
var request = require("request");
const router = express.Router()
const mongoose = require("mongoose")

const movieSchema = {
    title: String,
    genre: String,
    description: String,
    picture: { data: Buffer, contentType: String },
    cast: [{
        name: String,
        picture: { data: Buffer, contentType: String }
    }],
    review: [{
        rating: Number,
        reviewDescription: String
    }],
    overallRating: Number
};

const movie = mongoose.model(
    "Movies",
    movieSchema,
    "movies"
);

router
.route('/imdb')
.get((req, res) => { 
    request("https://www.omdbapi.com/?s=sting&apikey=thewdb", 
        function(error, response, body){
            if(!error && response.statusCode == 200){
                // res.send(body); < what we had before
                var data = JSON.parse(body);
                res.send(data);
                console.log(data);
                //res.render("results", {data: data});
            }
    });
    console.log("movie");
});

//var imgPath = 'D:/Lo/msa/pics/Sample_User_Icon.png';
 var imgPath = 'C:/Users/Deni/Pictures/Saved Pictures/cat.png';

// user.findOne({username: "deni"}, (err, foundItem) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(foundItem);
//     }
// })

//  movie.collection.insertOne(
//      {
//         title: "action",
//         genre: "adventure",
//         description: "best adventure movie",
//         picture: {
//             data: fs.readFileSync(imgPath),
//             contentType: 'image/png'
//         },
//         cast: [{
//             name: "some vips",
//             picture: {
//                 data: fs.readFileSync(imgPath),
//                 contentType: 'image/png'
//             }
//         }],
//         review: [{
//             rating: 10,
//             reviewDescription: "very good"
//         }],
//         overallRating: 10
//      }
//  )

router
    .route('/')
    .get((req, res) => {
        res.json({message: "movies browse page"})
    })
    
router
    .route('/:id')
    .get((req, res) => {
        res.json({message: `movie with id ${req.params.id}`})
    })

module.exports = router