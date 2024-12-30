const { EventEmitter } = require("events");
const { getUrlFunction } = require("../helper/database/url.helper");
const UAParser = require("ua-parser-js");
const { addAnalyticsFunction } = require("../helper/database/analytics.helper");
const { getGeoLocation } = require("../utils/geolocation");

const Event = new EventEmitter();

Event.on("analytics", async (shortUrl, alias, req) => {
  try {
    const userAgent = req.headers["user-agent"];
    const parser = new UAParser();
    const uaResult = parser.setUA(userAgent).getResult();

    const date = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    const geoLocation = await getGeoLocation();

    let query = {
      shortUrl,
      alias,
      date,
      userAgent: userAgent,
      ipAddress: req.ip,
      os: uaResult.os.name,
      deviceType: uaResult.device.type || "unknown",
      geoLocation: geoLocation ? geoLocation : null,
    };

    await addAnalyticsFunction(query);
  } catch (err) {
    console.log("👨🏻‍💻 ~ file: analytics.events.js:29 ~ Event.on ~ err:", err);
  }
});

module.exports = Event;
