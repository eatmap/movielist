const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../../index');
const User = require('../../models/user');

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  process.env.JWT_SECRET = 'my-jwt-secret';
});

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Registration routes', () => {
  test('should create new user for valid credentials', (done) => {
    const username = 'newUsername';
    const password = 'newpassword;';
    supertest(app)
      .post('/api/auth/register')
      .send({
        username,
        password,
      })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
