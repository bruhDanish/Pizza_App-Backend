class UserService {

    constructor(_userRepository){
        // this will create a new instance of UserRepository
        this.userRepository = _userRepository;
    }

    async registerUser(userDetails){
        // this will create a new user in the db
        const user= await this.userRepository.findUser({
            email: userDetails.email,
            mobile: userDetails.mobile
        })

        if(user){
            throw {reason: "User already exists", statusCode: 400};
        }

        const newUser = await this.userRepository.createUser({
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
}

module.exports = UserService;