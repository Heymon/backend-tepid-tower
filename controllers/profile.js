const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");


/* =====PROFILE ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});

// POST  Add score to score list IN PROFILE AND chek for highscore
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

//PUT EDIT PROFILE
router.put("/edit", async function (req, res) { 
    try {
        const checkUsername = await (await db.Profile.findOne({username: req.body.username}));

        if (!checkUsername) {
            const updatedProfile = await db.Profile.findByIdAndUpdate(
                req.body.id, 
                {
                    username: req.body.username,
                    country: req.body.country
                }, {new: true});
            
            
            return res.status(200).json({status: 200, updatedProfile});
            
        }

        return res.send({field: "username", message: "This username is already being used."});

    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }


})

// POST  Add user to friends list IN PROFILE
router.post("/addFriend", async function (req, res) {
    
    try {

        const foundUser = await db.User.findOne({email: req.body.email});

        if (foundUser) {
            await db.Profile.findByIdAndUpdate(
                req.body.id, 
                {
                    $push:
                        {
                            friends: foundUser._id
                        }
                }, {new: true});

            return res.status(200).json({status: 200, message:"Friend was added.",foundUser});
        }
        
        res.status(500).json({status: 500, field: "email", message:"User doesnt exist."});
        
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }


})


module.exports = router;