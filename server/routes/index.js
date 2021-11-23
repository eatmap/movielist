const express = require('express');

const authRoutes = require('./auth');
const searchRoutes = require('./search');

const router = express.Router();

router.get('/isup', (req, res) => {
  res.json({ message: "I'm alive" });
});

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);

router.get('/*', (req, res) => {
  return res.status(404).json({ message: 'Invalid endpoint' });
});

module.exports = router;
