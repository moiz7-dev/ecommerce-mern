const express = require('express');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Route imports
app.use('/api/v1', require('./routes/product'));
app.use('/api/v1', require('./routes/user'));
app.use('/api/v1', require('./routes/order')); 

// Error middlewares
app.use(errorMiddleware);

module.exports = app;