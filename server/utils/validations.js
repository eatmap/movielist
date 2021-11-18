// Ensure the provided string is non-empty
function validateNonEmptyStr(str, stringName) {
  if (!str || str.trim().length === 0) {
    throw new Error(
      `Please provide a valid ${stringName || 'string'}`,
    );
  }
}

function validatePassword(password) {
  if (!password) {
    throw new Error('Please provide a password');
  }

  const minLength = 8;

  const passwordLength = password.trim().length;
  if (passwordLength < minLength) {
    throw new Error(
      `Password must have at least ${minLength} characters`,
    );
  }
}

module.exports = {
  validateNonEmptyStr,
  validatePassword,
};
