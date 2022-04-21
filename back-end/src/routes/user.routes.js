const routes = require('express').Router();
const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const validateJoi = require('../middlewares/validateJoi');
const { validateUser } = require('../schemas/schemaJoi');

routes.post('/', validateJoi(validateUser), rescue(userController.create));

module.exports = routes;
