const { isMatchingHash, hashPassword } = require('../password');

describe('Generate Password Hash', () => {
  test('should generate a valid password hash', async () => {
    const plainPassword = 'hello123';
    const gotPasswordHash = await hashPassword(plainPassword);

    expect(gotPasswordHash).not.toEqual(plainPassword);
  });

  test('should throw error on empty password', async () => {
    const plainTextPassword = null;
    await expect(hashPassword(plainTextPassword)).rejects.toThrowError();
  });
});


describe('Match Password Hash', () => {
  const hash = '$2a$10$1uCGV1bFXkbnleZtBca4yuy5yn9X349z8w2FHlGQP4LYlM/vardJm';

  test('should return true for matching password hash', async () => {
    const plainPassword = 'hello123';
    const result = await isMatchingHash(plainPassword, hash);
    expect(result).toBeTruthy();
  });

  test('should return false for unmatching password hash', async () => {
    const plainPassword = 'hello101';
    const result = await isMatchingHash(plainPassword, hash);
    expect(result).not.toBeTruthy();
  });

  test('should throw error on empty password', async () => {
    await expect(isMatchingHash(null, hash)).rejects.toThrowError();
  });

  test('should throw error on empty password hash', async () => {
    await expect(isMatchingHash('hello123', null)).rejects.toThrowError();
  });
});
