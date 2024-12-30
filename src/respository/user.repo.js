const User = require('../schema/user.schema.js');

class UserRepository{
    async findUser(params){
        try {
            const response = await User.findOne({...params});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(userDetails){
        try {
            const response = await User.create(userDetails);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserRepository;