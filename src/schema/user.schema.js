const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'First name is required'],
        minLength: [3, 'First name must be at least 5 characters'],
        maxLength: [20, 'First name must be at most 20 characters'],
        lowercase: true,
        trim: true // remove white spaces
    },
    lastName:{
        type: String,
        required: [true, 'Last name is required'],
        minLength: [3, 'Last name must be at least 5 characters'],
        maxLength: [20, 'Last name must be at most 20 characters'],
        lowercase: true,
        trim: true
    },
    mobile:{
        type: String,
        required: [true, 'Mobile number is required'],
        minLength: [10, 'Mobile number must be at least 10 characters'],
        maxLength: [10, 'Mobile number must be at most 10 characters'],
        unique: [true, 'Mobile number already exists'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        maxLength: [20, 'Password must be at most 20 characters'],
        trim: true
    }
}, {timestamps: true});

userSchema.pre('save', async function(){
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    console.log(this);
})

const User = mongoose.model('User', userSchema);

module.exports = User;