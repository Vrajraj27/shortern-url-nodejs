const request = require("request");
const { GEOLOCATION_APIKEY } = require("../config/config");

module.exports.getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        method: "GET",
        url: `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_APIKEY}`,
        headers: {},
      };
      request(options, function (error, response) {
        if (error) resolve(false);
        resolve(response.body);
      });
    } catch (e) {
      console.log("👨🏻‍💻 ~ file: geolocation.js:14 ~ returnnewPromise ~ e:", e);
      resolve(false);
    }
  });
};
