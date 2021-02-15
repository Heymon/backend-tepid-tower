/* ===== EXTERNAL MODULES ===== */
const express = require("express");
const cors = require("cors");

/* ===== INTERNAL MODULES ===== */
const controllers = require("./controllers");

/* ===== INSTANCED MODULES ===== */
const app = express();

/* =====MIDDLEWARE==== */
app.use(cors());//cors configuration
app.use(express.json());//-JSON parsing
app.use(express.static(__dirname + "/build"));

/* ===== CONFIGURATIONS ===== */
require("dotenv").config();
const PORT = process.env.PORT || 4000;

/* ===== CONTROLLERS ===== */

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build' + '/index.html');
  });

app.use("/", controllers.auth);

app.use("/profile", controllers.profile);

app.use("/user", controllers.user);

app.use("/leaderboard", controllers.leaderboard);

// app.get('/', (req, res) => res.send('Hello World!'));

/* ===== SERVER LISTENER ===== */
app.listen(PORT, function () {
    console.log(`Blog Application is live at http://localhost:${PORT}/`)
});