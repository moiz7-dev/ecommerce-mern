const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/user");
const { sendToken } = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    let query = {
        avatar: {
            public_id: '',
            url: ''
        }};

    if(req.body.avatar){
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        });

        query = {
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        }
    }

    const user = await User.create({ 
        ...query, 
        name,
        email,
        password})

    sendToken(user, 201, res);
});

// login 
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    // checking both the fields
    if (!email || !password) {
        return next(new ErrorHandler('Email & Password is required!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password!', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
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


//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Reset',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

})

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ resetPasswordToken });

    if (!user) {
        return next(new ErrorHandler('Reset Password token is invalid or has been expired!', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesn\'t matched!', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});


// get User details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


// update password 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {


    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Old password is invalid!', 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match!', 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})

// update user details 
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const userData = {
        name: req.body.name,
        email: req.body.email,
        // avatar  cloudinary is not implemented yet
    }

    const user = await User.findByIdAndUpdate(req.user.id, userData);

    res.status(200).json({
        success: true,
    })
})

//get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User .find();

    res.status(200).json({
        success: true,
        users
    });

})

//get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exists with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        user
    });

});

//update user role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, userData);

    if (!user) {
        return next(new ErrorHandler(`User does not exists with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
    })
})

//delete user (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exists with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully!'
    })

});