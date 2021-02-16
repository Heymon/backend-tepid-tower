const mongoose = require("mongoose");

/* ===== CONFIGURATIONS ===== */
require("dotenv").config();

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/tepid_tower";

mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


mongoose.connection.on("connected", function () {
    console.log("COnnected!");
});

mongoose.connection.on("error", function (error) {
    console.log("Something is wrong");
    console.log(error);
});

mongoose.connection.on("disconnected", function () {
    console.log("disCOnnected!");
});

module.exports = {
    User: require("./User"),
    Profile: require("./Profile"),

}