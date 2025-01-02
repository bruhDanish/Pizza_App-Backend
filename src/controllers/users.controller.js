const {registerUser} = require("../services/user.service.js")

async function createUser(req, res) {
    
    try {
        const response = await registerUser(req.body);

        return res.status(201).json({
            message: 'User created',
            data: response,
            success: true,
            error: null
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: 'User not created',
            data: null,
            success: false,
            error: error
        })
    }    

}

module.exports = {
    createUser
}