const express = require('express');

const authRoutes = require('./auth');

const router = express.Router();

router.get('/isup', (req, res) => {
  res.json({ message: "I'm alive" });
});

router.use('/auth', authRoutes);

module.exports = router;
