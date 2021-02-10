const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");


/* =====PROFILE ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});

router.post("/addScore", async function (req, res) {
    try {

        const checkUser = await (await db.Profile.findOne({_id: req.body.id, scores: {$elemMatch: {$gte: req.body.score}}}));

        if(checkUser) {
            console.log("checked");
            checkUser.scores.push(req.body.score);
            checkUser.scores.sort((a, b) => a - b);
            checkUser.save()
            return res.status(200).json({status: 200, message:"NO highscore", checkUser});
        }

        const updatedUser = await db.Profile.findByIdAndUpdate(req.body.id, {
            $set: {highscore: req.body.score}, 
            $push: {
                scores: {
                    $each: [req.body.score], 
                    $sort: {scores: 1}
                }
            }
        }, {new: true});

        res.status(200).json({status: 200, updatedUser});
        
    } catch (error) { 
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }

})


module.exports = router;