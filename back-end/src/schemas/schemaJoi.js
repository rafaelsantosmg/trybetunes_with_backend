const Joi = require('joi');

const validateUser = Joi.object({
  userName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateUpdateUser = Joi.object({
  userName: Joi.string().min(3),
  password: Joi.string().min(6),
  description: Joi.string().max(500),
  image: Joi.string(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  validateUser,
  validateUpdateUser,
  validateLogin,
};
