const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { cookieExtractor, headerExtractor } = require('./extractors');

const expirationHour = 2;

const algorithm = 'HS256';
const secret = process.env.JWT_SECRET || 'my-jwt-secret';
const expiresIn = expirationHour * 60 * 60;
const issuer = 'accounts.movielist.com';
const audience = 'movielist.com';

const JWT_OPTIONS = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, headerExtractor]),
  secretOrKey: secret,
  algorithms: [algorithm],
  issuer,
  audience,
};

// Initialize password to use JWT for authentication
passport.use(
  new Strategy(JWT_OPTIONS, (payload, done) => {
    const userId = payload.sub;
    User.findById(userId, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      }
      return done(null, false, { message: 'User not found' });
    });
  }),
);

// Helper method to create JWT token for a given user
function createJWT(user) {
  const subject = user.id;

  const tokenOptions = {
    algorithm,
    expiresIn,
    audience,
    issuer,
    subject,
  };

  const token = jwt.sign(
    {
      id: subject,
    },
    secret,
    tokenOptions,
  );

  return token;
}

// Check if the incoming request is authenticated
function authenticate(req, res, next) {
  return passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: 'Please authenticate with the app' });
      }
      return next();
    },
  )(req, res, next);
}

module.exports = {
  passport,
  createJWT,
  authenticate,
  expiresIn,
};
