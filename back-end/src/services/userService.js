const { User } = require('../database/models');
const throwError = require('../util/throwError');
const error = require('../util/throwError');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw throwError(404, 'User not foud');

  return user;
};

const getUserForAuth = async (userEmail) => {
  const user = await User.findOne({
    where: { email: userEmail },
    attributes: { exclude: ['password'] },
  });

  return user;
};

const create = async ({ userName, email, password }) => {
  const userExist = await User.findOne({ where: { email } });

  if (userExist) throw error(409, 'User already registered!');

  const user = await User.create({ userName, email, password });

  return user;
};

const update = async ({ userName, password, description, image, email, id }) => {
  const userExist = await User.findOne({ where: { email } });

  if (!userExist) throw error(404, 'User not found!');

  await User.update({ userName, password, description, image }, { where: { id } });

  return { id, userName, email, description, image };
};

module.exports = {
  getAll,
  getById,
  create,
  getUserForAuth,
  update,
};
