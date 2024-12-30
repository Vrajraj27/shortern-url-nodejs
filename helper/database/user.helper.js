const UserModel = require("../../schema/user.model");

module.exports.createUserFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createUserQuery = await UserModel.create(query);

      resolve(createUserQuery);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: user.helper.js:10 ~ module.exports.createUserFunction= ~ error:",
        error
      );
      resolve(false);
    }
  });
};

module.exports.getUserFindOneFunction = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userDetails = await UserModel.findOne(query);

      resolve(userDetails);
    } catch (error) {
      console.log(
        "👨🏻‍💻 ~ file: user.helper.js:26 ~ module.exports.getUserFindOneFunction= ~ error:",
        error
      );
      resolve(false);
    }
  });
};
