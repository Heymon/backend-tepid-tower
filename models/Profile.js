const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
        username: {type: String, required: true, unique: true},
        country: {type:String, required: true},
        highscore: {type: Number, default: 0, required: true},
        scores: [{type: Number}],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    })

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;