const app = require('./app');
const dotenv = require('dotenv');
const initDatabase = require('./config/database');

//Handling Uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');

    server.close(() => {
        process.exit(1);
    })

})

//config
dotenv.config({path: 'backend/config/config.env'});

// connect to database
initDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    })

})