const jwt = require('jsonwebtoken');

const User = require("../models/user");
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const {token} = req.cookies;

    if(!token) {
        return next(new ErrorHandler('Please login to access this resource.', 401));
    }


    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedJwt.id);

    next();
})

exports.authorizeRoles = (...roles) => (req, res, next) => {

    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed!`, 403));
    }

    next();

}