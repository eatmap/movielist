const { validatePassword, validateNonEmptyStr } = require('../validations');

describe('Password validations', () => {
  test('should reject empty passwords', () => {
    expect(() => validatePassword(null)).toThrowError();
  });

  test('should reject password less than 8 characters', () => {
    const password = 'hello';
    expect(() => validatePassword(password)).toThrowError();
  });

  test('should reject password less than 8 characters', () => {
    const password = 'hello';
    expect(() => validatePassword(password)).toThrowError();
  });

  test('should accept valid password', () => {
    const password = 'validPassword123';
    expect(() => validatePassword(password)).not.toThrowError();
  });
});

describe('Non-empty string validations', () => {
  test('should throw error on empty strings', () => {
    expect(() => validateNonEmptyStr('  ')).toThrowError();
  });

  test('should throw error on null strings', () => {
    expect(() => validateNonEmptyStr(null)).toThrowError();
  });

  test('should not throw error on non-empty strings', () => {
    expect(() => validateNonEmptyStr('  d  ')).not.toThrowError();
  });
});
