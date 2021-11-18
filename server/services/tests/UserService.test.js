const mongoose = require('mongoose');
const User = require('../../models/user');
const UserService = require('../UserService');

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await User.deleteMany({});
});

async function createTestUser(username, password) {
  return User.create({ username, password });
}

describe('Get user by username', () => {
  test('should throw error on missing username', async () => {
    await expect(UserService.getUserByUsername(null)).rejects.toThrowError();
  });

  test('should find user when username is valid', async () => {
    // create new user
    const username = 'existingUser';
    const password = 'testPassword';
    await createTestUser(username, password);

    const gotUser = await UserService.getUserByUsername(username);
    expect(gotUser).not.toBeNull();
    expect(gotUser.username).toEqual(username);
    expect(gotUser.password).toEqual(password);
  });

  test('should not return user when username is incorrect', async () => {
    const gotUser = await UserService.getUserByUsername('nonExistingUser');
    expect(gotUser).toBeNull();
  });
});

describe('Create new user', () => {
  test('should create user for valid user data', async () => {
    const username = 'newUser';
    const password = 'password';

    const expectedUser = await UserService.createUser({ username, password });

    const gotUser = await User.findOne({ username: username });

    expect(expectedUser.id).toEqual(gotUser.id);
    expect(expectedUser.username).toEqual(gotUser.username);
    expect(expectedUser.password).toEqual(gotUser.password);
  });

  test('should not create user with duplicate username', async () => {
    const username = 'duplicateUser';
    await createTestUser(username, 'password');

    const duplicateUser = {
      username,
      password: 'newPassword',
    };
    await expect(UserService.createUser(duplicateUser)).rejects.toThrowError();
  });
});
