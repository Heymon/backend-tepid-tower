/* ===== EXTERNAL MODULES ===== */
const express = require("express");


/* ===== INSTANCED MODULES ===== */
const app = express();


/* ===== CONFIGURATIONS ===== */
const PORT = 4000;

/* ===== ROUTES ===== */
app.get('/', (req, res) => res.send('Hello World!'));

/* ===== SERVER LISTENER ===== */
app.listen(PORT, function () {
    console.log(`Blog Application is live at http://localhost:${PORT}/`)
});