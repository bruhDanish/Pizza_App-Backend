const { loginUser } = require("../services/auth.service.js");

async function login(req, res){
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);
        res.cookie("authToken", response, {
            httpOnly: true,
            secure:false,
            // maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {},
            error: null
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            error: error
        })
    }
}

module.exports = {
    login
}