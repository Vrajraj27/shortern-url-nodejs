const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const { getUserFindOneFunction } = require("../helper/database/user.helper");

module.exports.verifyJWTToken = (request, response, next) => {
  try {
    let authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(403).json({
        status: false,
        message: "Please provide a valid authorization",
        data: null,
      });
    } else {
      jwt.verify(authHeader, config.JWT_AUTH_TOKEN, async (err, result) => {
        if (err) {
          return response.status(401).json({
            status: false,
            message: "You are not authorized",
            data: null,
          });
        } else {
          if (result) {
            const user = await getUserFindOneFunction({ _id: result?._id });
            if (!user) {
              return response.status(401).json({
                status: false,
                message: "You are not authorized",
                data: null,
              });
            }
            request.body.user = user;
            return next();
          } else {
            return response.status(401).json({
              status: false,
              message: "Invalid token",
              data: null,
            });
          }
        }
      });
    }
  } catch (e) {
    console.log("👨🏻‍💻 ~ file: jwt.middleware.js:45 ~ e:", e);
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};
