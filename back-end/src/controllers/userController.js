const { createToken } = require('../auth/userAutenticate');
const userService = require('../services/userService');

const create = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userService.create({ userName, email, password });
  const token = createToken(user);

  return res.status(201).json(token);
};

module.exports = {
  create,
};
