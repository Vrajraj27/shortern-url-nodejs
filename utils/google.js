const config = require("../config/config");
const { google } = require("googleapis");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_CALLBACK_URL } =
  config.GOOGLE;

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_CALLBACK_URL
);
module.exports.generateGoogleUrl = async () => {
  return new Promise(async (resolve) => {
    try {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        state: "GOOGLE",
      });
      return resolve(url + "&prompt=consent");
    } catch (error) {
      console.log("👨🏻‍💻 ~ file: google.js:24 ~ returnnewPromise ~ error:", error);
      return resolve(false);
    }
  });
};

module.exports.verifyGoogleToken = async (code) => {
  return new Promise(async (resolve) => {
    try {
      const getTokens = await oauth2Client.getToken(code);

      resolve(getTokens.tokens);
    } catch (error) {
      console.log("👨🏻‍💻 ~ file: google.js:37 ~ returnnewPromise ~ error:", error);
      return resolve(false);
    }
  });
};

module.exports.getGoogleId = async (token) => {
  return new Promise(async (resolve) => {
    try {
      const getId = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });

      resolve(getId?.payload);
    } catch (error) {
      console.log("👨🏻‍💻 ~ file: google.js:53 ~ returnnewPromise ~ error:", error);
      return resolve(false);
    }
  });
};
