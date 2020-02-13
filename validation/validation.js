const Joi = require('@hapi/joi');

const registrationSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

const registerValidation = data => {
  return registrationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
