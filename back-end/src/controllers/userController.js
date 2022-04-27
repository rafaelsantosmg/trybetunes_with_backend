const { createToken } = require('../auth/userAutenticate');
const userService = require('../services/userService');

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  return res.status(200).json(user);
};

const create = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userService.create({ userName, email, password });
  const token = createToken(user);

  return res.status(201).json(token);
};

const update = async (req, res) => {
  const { userName, password, description, image } = req.body;
  const { id } = req.params;

  const { email } = req.data;

  const updateUser = await userService.update({
    userName,
    password,
    description,
    image,
    email,
    id,
  });
  res.status(200).json(updateUser);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
