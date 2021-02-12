const router = require("express").Router();

const db = require("../models");

/* =====PROFILE ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});

router.get("/global", async function (req, res) {
    try {   

            console.log("looking hereer");
            // console.log(req);
            const curUsers = await db.User.find({}).populate("profile");

            return res.status(200).json({status: 200, curUsers});
       
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }
});

module.exports = router;