const AnalyticsModel = require("../../schema/analytics.model");

module.exports.addAnalyticsFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createAnalyticsQuery = await AnalyticsModel.create(query);

      resolve(createAnalyticsQuery);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: analytics.helper.js:10 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getAnalyticsFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAnalyticsDetails = await AnalyticsModel.findOne(query);

      resolve(getAnalyticsDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: analytics.helper.js:26 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getAllAnalyticsFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAnalyticsDetails = await AnalyticsModel.find(query);

      resolve(getAnalyticsDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: analytics.helper.js:42 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getAnalyticsAggerigationFunction = async (pipeline) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getAnalyticsDetails = await AnalyticsModel.aggregate(pipeline);

      resolve(getAnalyticsDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: analytics.helper.js:59 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.updateAnalyticsFunction = async (find, set) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateAnalyticsDetails = await AnalyticsModel.findOneAndUpdate(
        find,
        set,
        {
          new: true,
        }
      );

      resolve(updateAnalyticsDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: analytics.helper.js:80 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};
