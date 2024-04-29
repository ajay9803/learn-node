const Joi = require("joi");

const postValidationSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(10).required(),
});

module.exports = postValidationSchema;
