const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middleware/error');

//config
dotenv.config({path: 'backend/config/config.env'});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

// Route imports
app.use('/api/v1', require('./routes/product'));
app.use('/api/v1', require('./routes/user'));
app.use('/api/v1', require('./routes/order')); 
app.use('/api/v1', require('./routes/payment')); 

// Error middlewares
app.use(errorMiddleware);

module.exports = app;