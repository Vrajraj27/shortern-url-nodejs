const Joi = require("joi");

module.exports.addUrl = async (request, response, next) => {
  let rules = Joi.object().keys({
    longUrl: Joi.string().required(),
    customAlias: Joi.string().optional(),
    topic: Joi.string().optional(),
  });
  const { error } = rules.validate(request.body);
  if (error) {
    return response
      .status(422)
      .json({ status: false, message: error?.details[0]?.message, data: null });
  } else {
    return next();
  }
};

module.exports.getUrl = async (request, response, next) => {
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
