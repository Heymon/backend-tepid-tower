const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        email: {
            type:String, 
            required: true, 
            unique: true,
            // regEx to make sure email has email format
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
        password: {type: String, required: true, minLength: 8},
        profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
    },
    {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = User;