const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server.config.js');
const UnauthorizedError = require('../utils/unauthError.js');

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

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(!decoded){
            throw new UnauthorizedError();
        }

        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }
    
        next();
    } catch (error) {
            return res.status(401).json({
                message: "Unauthorized, invalid token provided",
                data: {},
                success: false,
                error: "Not authenticated"
            });
        }
}

function isAdmin(req, res, next){
    const loggedInUser = req.user;

    if(loggedInUser.role === 'ADMIN'){
        next();
    }else{
        return res.status(401).json({
            success: false,
            message: "Unauthorized, not an admin",
            data: {},
            error: {
                statusCode: 401,
                reason: "Not an admin"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}