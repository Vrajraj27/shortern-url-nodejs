const UrlModel = require("../../schema/urls.model");

module.exports.addUrlFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createUrlQuery = await UrlModel.create(query);

      resolve(createUrlQuery);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: url.helper.js:10 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getUrlFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUrlDetails = await UrlModel.findOne(query);

      resolve(getUrlDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: url.helper.js:26 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getAllUrlFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getUrlDetails = await UrlModel.find(query);

      resolve(getUrlDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: url.helper.js:43 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.updateUrlFunction = async (find, set) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updateUrlDetails = await UrlModel.findOneAndUpdate(find, set, {
        new: true,
      });

      resolve(updateUrlDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: url.helper.js:60 ~ returnnewPromise ~ error:",
        error
      );
      resolve(false);
    }
  });
};
