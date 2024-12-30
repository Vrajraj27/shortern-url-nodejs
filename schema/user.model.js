const mongoose = require("mongoose");
const { Schema } = mongoose;

const Users = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", Users);
