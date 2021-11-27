const express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  { passport } = require('./auth');

/**
 * Configure Mongoose
 */
mongoose.set('toJSON', {
  virtuals: true,
});

mongoose.set('toObject', {
  virtuals: true,
});

/**
 * Setup express with additional plugins
 */
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

/**
 * Map all the routes for the application
 */
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

/**
 * If production, serve React build
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Invalid endpoint' });
  });
}

module.exports = app;
