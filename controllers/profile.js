const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");

const authRequired = require("../middleware/authRequired");

/* =====PROFILE ROUTES======= */

router.get("/", authRequired, async function (req, res) {
    try {   
            console.log(req.currentUser);
            const curUser = await db.User.findById(req.currentUser).populate("profile");

            return res.status(200).json({status: 200, curUser});
       
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }
});

// POST  Add score to score list IN PROFILE AND chek for highscore
router.post("/addScore", authRequired, async function (req, res) {
    try {

        console.log("chegou?");
        console.log(req.body);

        const curUser = await db.User.findById(req.currentUser).populate("profile"); 
        const checkProfile = await db.Profile.findOne(
            {
                _id: curUser.profile, 
                scores: {$elemMatch: {$gte: req.body.score}}
            });

        if(checkProfile) {
            console.log("checked");
            checkProfile.scores.push(req.body.score);
            checkProfile.scores.sort((a, b) => b - a);
            checkProfile.save()
            return res.status(200).json({status: 200, message:"score", updatedProfile: checkProfile});
        }
        
        const updatedProfile = await db.Profile.findByIdAndUpdate(curUser.profile, {
            $set: {highscore: req.body.score}, 
            $push: {
                scores: {
                    $each: [req.body.score], 
                    $sort: {scores: -1}
                }
            }
        }, {new: true});
                
        return res.status(200).json({status: 200, message:"highscore", updatedProfile});
        
    } catch (error) { 
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }

});

//PUT EDIT PROFILE
router.put("/edit", authRequired, async function (req, res) { 
    try {
        // TODO bug where same username think it is taken
        const checkUsername = await db.Profile.findOne({username: req.body.username});
        
        
        if (!checkUsername) {
            let curUser = await db.User.findById(req.currentUser);

            await db.Profile.findByIdAndUpdate(
                curUser.profile, 
                {
                    username: req.body.username,
                    country: req.body.country
                }, {new: true});
            
            curUser = await db.User.findById(req.currentUser).populate("profile");

            return res.status(200).json({status: 200, updatedUser: curUser});
            
        }

        return res.send({field: "username", message: "This username is already being used."});

    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }


});

// POST  Add user to friends list IN PROFILE
router.post("/addFriend", authRequired, async function (req, res) {
    try {

        const foundFriend = await db.User.findOne({email: req.body.friendEmail});
        
        if (foundFriend) {

            const curUser = await db.User.findById(req.currentUser)
            const checkProfile = await db.Profile.findOne(
                {
                    _id: curUser.profile, 
                    friends: {$elemMatch: {$eq: foundFriend._id}}
                });
            console.log(checkProfile);
            if(checkProfile){
                return res.status(302).json({status: 302, field: "email", message:"User already your friend."});
            }

            await db.Profile.findByIdAndUpdate(
                curUser.profile, 
                {
                    $push:
                        {
                            friends: foundFriend._id
                        }
                }, {new: true});

            return res.status(200).json({status: 200, field: "email",message:"Friend was added.",foundFriend});
        }
        
        res.status(404).json({status: 404, field: "email", message:"User doesnt exist."});
        
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }


});


module.exports = router;