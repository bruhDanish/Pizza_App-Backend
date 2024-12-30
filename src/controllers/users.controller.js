const userRepository = require("../respository/user.repo.js");
const UserService = require("../services/user.service.js");


async function createUser(req, res) {
    console.log('Creating a user...');
    console.log(req.body);
    
    const userService = new UserService(new userRepository());
    console.log(userService);
    
    try {
        const response = await userService.registerUser(req.body);

        return res.json({
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
            error: error.reason
        })
    }    

}

module.exports = {
    createUser
}