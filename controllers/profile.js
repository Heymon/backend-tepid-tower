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

        const checkProfile = await (await db.Profile.findOne({_id: req.body.id, scores: {$elemMatch: {$gte: req.body.score}}}));

        if(checkProfile) {
            console.log("checked");
            checkProfile.scores.push(req.body.score);
            checkProfile.scores.sort((a, b) => b - a);
            checkProfile.save()
            return res.status(200).json({status: 200, message:"NO highscore", checkProfile});
        }

        const updatedProfile = await db.Profile.findByIdAndUpdate(req.body.id, {
            $set: {highscore: req.body.score}, 
            $push: {
                scores: {
                    $each: [req.body.score], 
                    $sort: {scores: -1}
                }
            }
        }, {new: true});

        return res.status(200).json({status: 200, updatedProfile});
        
    } catch (error) { 
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }

});

router.put("./edit", async function (req, res) {
    
    const updatedProfile = await db.Profile.findByIdAndUpdate(req.body.id, req.body, {new: true})

})


module.exports = router;