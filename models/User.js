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
    {timestamps: true});

    userSchema.set("toJSON", {
        // doc is the document that the database is returning
        // ret is the return in js data
        // opt is propably different obj options
        transform: (doc, ret, opt) => {// so  when transforming in to json
          delete ret["password"];//deletes the password from the data so it is not visible
          return ret;
        },
      });

const User = mongoose.model("User", userSchema);

module.exports = User;