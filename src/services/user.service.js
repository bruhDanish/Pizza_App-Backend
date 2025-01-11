const { findUser, createUser } = require("../repository/user.repo");

    async function registerUser(userDetails){
        // this will create a new user in the db
        const user= await findUser({
            email: userDetails.email,
            mobile: userDetails.mobile
        })

        if(user){
            throw {reason: "User already exists", statusCode: 400};
        }

        const newUser = await createUser({
            email: userDetails.email,
            mobile: userDetails.mobile,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName
        });

        if(!newUser){
            throw {reason: "Couldn't create user, something went wrong", statusCode: 500};
        };

        return newUser;
    }

module.exports = {
    registerUser
};