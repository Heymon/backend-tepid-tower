const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");

const authRequired = require("../middleware/authRequired");

/* =====USER ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});

router.delete("/delete", authRequired, async function (req, res) {
    try {

        const deletedUser = await db.User.findByIdAndDelete(req.currentUser);

        await db.Profile.findByIdAndDelete(deletedUser.profile);
        
        return res.status(200).json({status: 200, message:"User was deleted", deletedUser});
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
        
    }
    
})

module.exports=router;