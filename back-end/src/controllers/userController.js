const { createToken } = require('../auth/userAutenticate');
const userService = require('../services/userService');

const create = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userService.create({ userName, email, password });
  const token = createToken(user);

  return res.status(201).json(token);
};

const update = async (req, res) => {
  const { userName, password, description, image } = req.body;
  const { email, id } = req.data;
  const updateUser = await userService.update({
    userName, password, description, image, email, id });
  console.log(updateUser);
}

module.exports = {
  create,
  update,
};
