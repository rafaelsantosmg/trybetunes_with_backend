const { decoderToken } = require('../auth/userAutenticate');
const UserService = require('../services/userService');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  
  const token = authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  
  const decoder = decoderToken(token);
  if (!decoder) return res.status(401).json({ message: 'Expired or invalid token' });
  
  const loginAuth = await UserService.getUserForAuth(decoder.data.email);
  if (!loginAuth) return res.status(400).json({ message: 'User not found' });

  req.data = loginAuth;
  
  next();
};

module.exports = {
  authMiddleware,
};