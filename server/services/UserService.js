const User = require('../models/user');
const { validateNonEmptyStr } = require('../utils/validations');

async function getUserById(userId) {
  const user = await User.findById(id).exec();
  return user;
}

async function getUserByUsername(username) {
  if (!username) {
    throw Error('Please provide a valid username');
  }
  const user = await User.findOne({ username }).exec();
  return user;
}

function parseNewUser(user) {
  const { username, passwordHash } = user;
  validateNonEmptyStr(username, 'username');
  validateNonEmptyStr(passwordHash, 'password');

  return { username, passwordHash };
}

async function createUser(user) {
  const parsedUser = parseNewUser(user);
  const newUser = await User.create(parsedUser);
  return newUser;
}

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
};
