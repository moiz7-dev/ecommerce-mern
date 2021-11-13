const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middleware/error');


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

// Route imports
app.use('/api/v1', require('./routes/product'));
app.use('/api/v1', require('./routes/user'));
app.use('/api/v1', require('./routes/order')); 

// Error middlewares
app.use(errorMiddleware);

module.exports = app;