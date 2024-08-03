const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
};

const verifyToken = (token) => {
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  return verified;
};

module.exports = {
  generateToken,
  verifyToken,
};
