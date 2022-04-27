const routes = require('express').Router();
const rescue = require('express-rescue');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/AuthenticateMiddleware');
const validateJoi = require('../middlewares/validateJoi');
const { validateUser, validateUpdateUser } = require('../schemas/schemaJoi');

routes.post('/', validateJoi(validateUser), rescue(userController.create));
routes.put(
  '/:id',
  validateJoi(validateUpdateUser),
  authMiddleware,
  rescue(userController.update),
);

module.exports = routes;
