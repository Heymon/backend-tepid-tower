const router = require("express").Router();

const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");


/* =====AUTH ROUTES======= */
router.get("/register", function (req, res) {
    res.send('Routes work');
});

router.post("/register", async function (req, res) {
    try {
        const checkEmail = await db.User.findOne({email: req.body.email});

        if(checkEmail) {
            return res.send({field: "email", message: "An account with this email already exists."})
        }

        const checkUsername = await db.Profile.findOne({username: req.body.username});

        // console.log(checkUsername);

        if(checkUsername) {
            return res.send({field: "username", message: "This username is already being used."})
        }

        const createdProfile = await db.Profile.create({
            username: req.body.username,
            country: req.body.country
        });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const createdUser = await db.User.create( {email: req.body.email, password: hash, profile: createdProfile._id});

        return res.status(201).json({status: 201, message: "success", createdUser, createdProfile});

    } catch(error) {
        return res.status(500).json({status: 500, message: "Something went wrong.", error})
    }

});
module.exports = router;