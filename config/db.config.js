const config = require("./config");
const mongoose = require("mongoose");

const connectDb = mongoose
  .connect(config.DB_URL, {
    serverSelectionTimeoutMS: 50000,
  })
  .then((res) => {
    console.log("Database Connect");
  })
  .catch((err) => {
    console.log("Connection to Database failed.");
    console.log("err: ", err);
  });

module.exports = connectDb;
