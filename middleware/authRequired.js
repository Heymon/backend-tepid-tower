const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefinied") {
        const token = bearerHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_JWT_KEY, function (error, payload) {
            if (error) {
                console.log(error);
                res.sendStatus(500);   
            }    

            req.currentUser = payload._id;
            next();
        });
    } else {
        res.sendStatus(403);
    }
}