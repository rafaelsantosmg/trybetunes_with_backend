const routes = require('express').Router();
const { authMiddleware } = require('../middlewares/AuthenticateMiddleware');

routes.get('/', authMiddleware, (_req, res) => res.status(200).end());

module.exports = routes;
