const routes = require('express').Router();
const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const validateJoi = require('../middlewares/validateJoi');
const { validateUser, validateUpdateUser } = require('../schemas/schemaJoi');

routes.post('/', validateJoi(validateUser), rescue(userController.create));
routes.put('/', validateJoi(validateUpdateUser),  rescue(userController.update));

module.exports = routes;
