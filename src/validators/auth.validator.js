const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server.config');

async function isLoggedIn(req, res, next){
    const token = req.cookies['authToken'];
    if(!token){
        return res.status(401).json({
            message: "Unauthorized, not auth token provided",
            data: {},
            success: false,
            error: "Not authenticated"
        });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if(!decoded){
        return res.status(401).json({
            message: "Unauthorized, invalid token provided",
            data: {},
            success: false,
            error: "Not authenticated"
        });
    }

    req.user = {
        email: decoded.email,
        id: decoded.id
    }

    next();
}

module.exports = {
    isLoggedIn
}