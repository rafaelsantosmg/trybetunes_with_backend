const { User } = require('../database/models');
const { createToken } = require('../auth/userAutenticate');
const error = require('../util/throwError');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: { exclude: ['password'] },
  });

  if (user === null || !user) {
    throw error(400, 'email or password incorrect');
  }

  const token = createToken(user);

  return { token, user };
};

module.exports = {
  login,
};
