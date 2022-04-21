const routes = require('express').Router();
const { authMiddleware } = require('../middlewares/AuthenticateMiddleware')

routes.get('/', authMiddleware);

module.exports = routes;