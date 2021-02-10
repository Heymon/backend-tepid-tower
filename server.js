/* ===== EXTERNAL MODULES ===== */
const express = require("express");

/* ===== INTERNAL MODULES ===== */
const controllers = require("./controllers");

/* ===== INSTANCED MODULES ===== */
const app = express();

/* =====MIDDLEWARE==== */
app.use(express.json());//-JSON parsing

/* ===== CONFIGURATIONS ===== */
const PORT = 4000;

/* ===== CONTROLLERS ===== */

app.use("/", controllers.auth);

app.use("/profile", controllers.profile);

app.use("/user", controllers.user);

// app.get('/', (req, res) => res.send('Hello World!'));

/* ===== SERVER LISTENER ===== */
app.listen(PORT, function () {
    console.log(`Blog Application is live at http://localhost:${PORT}/`)
});