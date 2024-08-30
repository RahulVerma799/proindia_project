const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['token'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer TOKEN'

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token is missing or invalid",
        });
    }

    jwt.verify(token, process.env.JWT_URL, (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid token",
            });
        }
        req.user = user; // Attach user information to request
        next();
    });
};
