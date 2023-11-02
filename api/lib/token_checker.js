const JWT = require("jsonwebtoken");
const tokenChecker = (req, res, next) => {
    let token;
    const authHeader = req.get("Authorization")
    if (authHeader) {
        token = authHeader.slice(7)
    }
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            res.status(401).json({ message: "auth error" });
        } else {
            req.user_id = payload.user_id;
            next();
        }
    });
};
module.exports = tokenChecker;