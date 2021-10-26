const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const { sendToken } = require("../utils/sendToken");

// Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'sample id',
            url: 'profile-pic-url'
        }
    })

    sendToken(user, 201, res);
});

// login 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const {email, password} = req.body;

    // checking both the fields
    if(!email || !password){
        return next(new ErrorHandler('Email & Password is required!', 400));
    }
    
    const user = await User.findOne({email}).select('+password');
    
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password!', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password!', 401));
    }

    sendToken(user, 200, res);

})

// logout

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: 'Succssfully logged out!'
    });

})