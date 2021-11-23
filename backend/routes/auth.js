const express = require("express")
const router = express.Router()

router
    .route('/login')
    .get((req, res) => {
        res.json({message: "login"})
    })
    .post((request, response) => {
        user.collection.findOne({username: request.body.username}, (err, foundItem) => {
            if (foundItem) {
                if (bcrypt.compareSync(request.body.password, foundItem.password)) {
                    console.log("success!");
                    response.sendStatus(200);
                }
            }
            else {
                console.log(err);
            }
        })
    })

    router
    .route('/register')
    .get((req, res) => {
        res.json({message: "register"})
    })
    .post((request, response) => {
        user.collection.insertOne(
        {
           username: request.body.username,
           password: bcrypt.hashSync(request.body.password, 10)
        })
        console.log(bcrypt.hashSync(request.body.password, 10));
    })

module.exports = router