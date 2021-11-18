const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// Create a hash for a password
async function hashPassword(password) {
  if (!password) {
    throw new Error('Please provide a valid password');
  }
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Determine if the provided password and the hash matches
async function isMatchingHash(password, hash) {
  if (!password) {
    throw new Error('Please provide a valid password');
  }

  if (!hash) {
    throw new Error('No password hash was found');
  }

  return bcrypt.compare(password, hash);
}

module.exports = {
  hashPassword,
  isMatchingHash,
};
