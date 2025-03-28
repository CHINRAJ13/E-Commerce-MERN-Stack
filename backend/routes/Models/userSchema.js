var mongoose = require('mongoose');
const validate = require('validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"]
    },
    email: {
        type: String,
        required: [true, "Please enter user email"],
        unique: true,
        validate:[validate.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter user password"],
        maxLength: [6, "Password cannot exist 6 characters"],
        select: false
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function() {
    // Generate token
    const token = crypto.randomBytes(20).toString('hex');

    // Generate hash and set to reset password token 
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    // set reset password token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 *60 *1000;

    return token;
}

const user = mongoose.model('User',userSchema);
module.exports = user;