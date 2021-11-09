const mongoose = require("mongoose");

const initDatabase = () => {
  mongoose.connect(process.env.Mongodb_URI)
    .then((data) => {
      console.log(`Mongodb Server connected on ${data.connection.host}`);
    })

};

module.exports = initDatabase;
