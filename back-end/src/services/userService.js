const { User } = require('../database/models');
const error = require('../util/throwError');

const create = async ({ userName, email, password }) => {
  const userExist = await User.findOne({ where: { email } });

  if (userExist) throw error(409, 'User already registered!');

  const user = await User.create({ userName, email, password });

  return user;
};

module.exports = {
  create,
};
