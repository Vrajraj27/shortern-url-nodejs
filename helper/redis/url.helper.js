const redisClient = require("../../config/redis.config");

module.exports.getUrlRedisFunction = async (alias) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = await redisClient.get(alias);

      resolve(url);
    } catch (e) {
      console.log("👨🏻‍💻 ~ file: url.helper.js:10 ~ returnnewPromise ~ e:", e);
      resolve(false);
    }
  });
};

module.exports.setUrlRedisFunction = async (alias, url) => {
  return new Promise(async (resolve, reject) => {
    try {
      await redisClient.set(alias, url);

      resolve(true);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: url.helper.js:23 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};
