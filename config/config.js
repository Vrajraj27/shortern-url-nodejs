require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8080,

  DB_URL: process.env.DB_URL,

  JWT_AUTH_TOKEN: process.env.JWT_AUTH_TOKEN,

  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: process.env.REDIS_PORT,
    PASSWORD: process.env.REDIS_PASSWORD,
  },

  GOOGLE: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_CALLBACK_URL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
  },

  GEOLOCATION_APIKEY: process.env.GEOLOCATION_APIKEY,
};

module.exports = config;
