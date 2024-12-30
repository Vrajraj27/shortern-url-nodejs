const Joi = require("joi");

module.exports.getAnalyticsByAlias = async (request, response, next) => {
  let rules = Joi.object().keys({
    alias: Joi.string().required(),
  });
  const { error } = rules.validate(request.params);
  if (error) {
    return response
      .status(422)
      .json({ status: false, message: error?.details[0]?.message, data: null });
  } else {
    return next();
  }
};

module.exports.getAnalyticsByTopic = async (request, response, next) => {
  let rules = Joi.object().keys({
    topic: Joi.string().required(),
  });
  const { error } = rules.validate(request.params);
  if (error) {
    return response
      .status(422)
      .json({ status: false, message: error?.details[0]?.message, data: null });
  } else {
    return next();
  }
};
