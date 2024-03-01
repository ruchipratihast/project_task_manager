const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) return res.status(401).json({ message: "Invalid token" });
        req.userId = decode.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyJwt;
