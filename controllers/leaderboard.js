const router = require("express").Router();

const db = require("../models");

/* =====PROFILE ROUTES======= */

router.get("/", function (req, res) {
    res.send('Routes work');
});

router.get("/global", async function (req, res) {
    try {   

            console.log("looking hereer");
            const curProfiles = await db.Profile.find({}).sort({ highscore : -1 }).limit(12);
            // const curProfiles = await db.Profile.find({$query: {}, $orderby: { highscore : 1 }});
            curProfiles.map((item) => {

                console.log(item.highscore);
            })

            return res.status(200).json({status: 200, curProfiles});
       
    } catch (error) {
        res.status(500).json({status: 500, message:"Something went wrong", error});
    }
});

module.exports = router;