const mongoose = require("mongoose");
const { Schema } = mongoose;

const analytics = new Schema(
  {
    shortUrl: { type: String, required: true },
    alias: { type: String, required: true },
    date: {
      type: String,
      required: true,
    },
    userAgent: { type: String, required: true },
    ipAddress: { type: String, required: true },
    os: { type: String, required: true },
    deviceType: { type: String, required: true },
    geoLocation: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("analytics", analytics);
