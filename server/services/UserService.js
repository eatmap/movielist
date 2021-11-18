const User = require('../models/user');
const { validateNonEmptyStr } = require('../utils/validations');

async function getUserById(userId) {
  const user = await User.findById(userId).exec();
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
  const { username, password } = user;
  validateNonEmptyStr(username, 'username');
  validateNonEmptyStr(password, 'password');

  return { username, password };
}

async function createUser(user) {
  const parsedUser = parseNewUser(user);

  // Determine if the username already exists
  const isExistingUsername = await User.exists({ username: parsedUser.username });
  if (isExistingUsername) {
    throw new Error('Username already exists');
  }

  const newUser = await User.create(parsedUser);
  return newUser;
}

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
};
