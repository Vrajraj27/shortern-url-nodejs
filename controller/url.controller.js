const Event = require("../events/analytics.events");
const { generateRandomString } = require("../helper");
const {
  addUrlFunction,
  updateUrlFunction,
  getUrlFunction,
} = require("../helper/database/url.helper");
const {
  getUrlRedisFunction,
  setUrlRedisFunction,
} = require("../helper/redis/url.helper");

module.exports.addUrl = async (request, response, next) => {
  try {
    const { longUrl, customAlias, topic, user } = request.body;

    let query = { longUrl, alias: customAlias, topic, createdBy: user?._id };

    if (!customAlias) {
      query.alias = await generateRandomString(6);
    }
    const host = request.get("host");

    query.shortUrl = `${request.protocol}://${host}${
      request.originalUrl.split("?")[0]
    }/${query.alias}`;

    const addUrl = await addUrlFunction(query);

    if (!addUrl) {
      return response.status(400).json({
        status: false,
        message: "Error generating url",
        data: null,
      });
    }

    await setUrlRedisFunction(query.alias, longUrl);

    return response.status(200).json({
      status: true,
      message: "Url added",
      data: {
        shortUrl: query.shortUrl,
        createdAt: addUrl?.createdAt,
      },
    });
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: url.controller.js:50 ~ module.exports.addUrl= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};

module.exports.getUrl = async (request, response, next) => {
  try {
    const { alias } = request.params;

    let originalUrl = await getUrlRedisFunction(alias);

    const host = request.get("host");
    let shortUrl = `${request.protocol}://${host}${
      request.originalUrl.split("?")[0]
    }`;

    if (!originalUrl) {
      let findUrl = await getUrlFunction({ alias });

      if (!findUrl) {
        return response.status(404).json({
          status: false,
          message: "Url not found",
          data: null,
        });
      }

      shortUrl = findUrl.shortUrl;
      originalUrl = findUrl.longUrl;

      await setUrlRedisFunction(alias, originalUrl);
    }

    Event.emit("analytics", shortUrl, alias, request);

    return response.redirect(originalUrl);
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: url.controller.js:93 ~ module.exports.addUrl= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};
