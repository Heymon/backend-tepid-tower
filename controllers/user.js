const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");

/* =====PROFILE ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});


router.delete("/delete", async function (req, res) {
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.body.id);
    
        await db.Profile.findByIdAndDelete(deletedUser.profile);
        
        return res.status(200).json({status: 200, deletedUser});

    } catch (error) {

        res.status(500).json({status: 500, message:"Something went wrong", error});
    }
});
module.exports=router;