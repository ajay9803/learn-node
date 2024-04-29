const Joi = require("joi");

const postValidationSchema = Joi.object({
  title: Joi.string().min(5).required(),
  // imageUrl: Joi.string().required(),
  // images: Joi.array().items(Joi.string()),
  content: Joi.string().required(),
});

module.exports = postValidationSchema;
