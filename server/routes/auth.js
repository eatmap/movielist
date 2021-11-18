const { Router } = require('express');
const { createJWT, authenticate, expiresIn } = require('../auth');
const { setJWTCookie } = require('../auth/extractors');
const { getUserByUsername, createUser } = require('../services/UserService');
const { isMatchingHash, hashPassword } = require('../utils/password');
const { validatePassword } = require('../utils/validations');

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: 'Please provide user credentials',
    });
  }

  try {
    // Validate user credentials
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        message: 'Please provide valid user credentials',
      });
    }

    const passwordMatch = await isMatchingHash(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: 'Please provide valid user credentials',
      });
    }

    // Generate JWT and save it as cookie
    const token = createJWT(user);
    setJWTCookie(res, token, expiresIn);

    return res.status(200).json({
      token,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Please provide new user details',
    });
  }

  try {
    // Validate and generate a password hash
    validatePassword(password);
    const hashedPassword = await hashPassword(password);

    const newUser = { username, password: hashedPassword };
    await createUser(newUser);
    return res.status(200).json({
      message: 'Successfully registered',
    });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/validate', authenticate, (req, res) =>
  res.status(200).json({
    message: 'Token is valid',
  }),
);

module.exports = router;
