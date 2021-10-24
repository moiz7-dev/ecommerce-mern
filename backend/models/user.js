const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [4, 'Name must be at least 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter your Email'],
        unique: true,
        validate: [validator.email, 'Please enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter your Password'],
        minlength: [4, 'Password must be at least 4 characters']
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpirt: Date

})

module.exports = Mongoose.model('user', userSchema);