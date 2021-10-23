const mongoose = require("mongoose");

const initDatabase = () => {
  mongoose.connect(process.env.Mongodb_URI)
    .then((data) => {
      console.log(`Mongodb Server connected on ${data.connection.host}`);
    })
    // .catch((err) => {
    //   console.log(`Mongodb connection ERROR!: ${err}`);
    // });
};

module.exports = initDatabase;
