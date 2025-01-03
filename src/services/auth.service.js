const { findUser } = require("../respository/user.repo.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/server.config.js');

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    const user = await findUser({ email });

    if(!user){
        throw {message: "User not found with given email", statusCode: 404};
    }

    const isPasswordValidated = bcrypt.compare(plainPassword, user.password);

    if(!isPasswordValidated){
        throw {message: "Invalid password", statusCode: 401};
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {expiresIn: JWT_EXPIRY} );

    return token;
}

module.exports = {
    loginUser
}