const Joi = require('joi');

const validateUser = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateUser,
  validateLogin,
};
