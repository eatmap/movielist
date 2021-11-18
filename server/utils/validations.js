// Ensure the provided string is non-empty
function validateNonEmptyStr(str, stringName) {
  if (!str || str.trim().length === 0) {
    throw new InvalidValueError(
      `Please provide a valid ${stringName || 'string'}`,
    );
  }
}

module.exports = {
  validateNonEmptyStr,
};
