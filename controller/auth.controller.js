const {
  getUserFindOneFunction,
  createUserFunction,
} = require("../helper/database/user.helper");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const {
  generateGoogleUrl,
  verifyGoogleToken,
  getGoogleId,
} = require("../utils/google");

module.exports.googleSignUpSignIn = async (request, response, next) => {
  try {
    const { code } = request.query;

    if (!code) {
      const url = await generateGoogleUrl();
      return response.redirect(url);
    }

    const data = await verifyGoogleToken(code);

    const googleInfo = await getGoogleId(data?.id_token);

    let query = {
      email: googleInfo?.email.toLowerCase(),
      name: googleInfo?.name,
    };

    let findUser = await getUserFindOneFunction(query);

    if (!findUser) {
      findUser = await createUserFunction(query);
    }

    const jwtToken = jwt.sign(
      JSON.stringify({
        _id: findUser?._id,
        createdAt: new Date().getTime(),
      }),
      config.JWT_AUTH_TOKEN
    );

    const sendData = {
      user: findUser,
      token: jwtToken,
    };

    return response.status(200).json({
      status: true,
      message: "User signin",
      data: sendData,
    });
  } catch (e) {
    console.log(
      "👨🏻‍💻 ~ file: auth.controller.js:56 ~ module.exports.googleSignUpSignIn= ~ e:",
      e
    );
    return response.status(500).json({
      status: false,
      message: "Server error",
      data: null,
    });
  }
};
