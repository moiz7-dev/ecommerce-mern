const express = require('express');

const errorMiddleware = require('./middleware/error');

const app = express();

app.use(express.json());

// Route imports
app.use('/api/v1', require('./routes/product'));

// Error middlewares
app.use(errorMiddleware);

module.exports = app;