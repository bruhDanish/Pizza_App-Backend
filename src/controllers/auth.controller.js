const { loginUser } = require("../services/auth.service.js");

async function login(req, res){
    try {
        const loginPayload = req.body;
        const response = await loginUser(loginPayload);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: response,
            error: null
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.reason,
            data: {},
            success: false,
            error: error
        })
    }
}

module.exports = {
    login
}