const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    console.log('error ----', err)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';


    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}