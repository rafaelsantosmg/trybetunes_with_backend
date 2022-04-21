const routes = require('express').Router();
const rescue = require('express-rescue');
const LoginController = require('../controllers/loginController');
const validateJoi = require('../middlewares/validateJoi');
const { validateLogin } = require('../schemas/schemaJoi');

routes.post('/', validateJoi(validateLogin), rescue(LoginController.login));

module.exports = routes;
