const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .required(),
  last_name: Joi.string()
    .min(2)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  username: Joi.string()
    .min(6)
    .required(),
  password: Joi.string()
    .min(6)
    .required()
});

const registerValidation = data => {
  return registrationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
