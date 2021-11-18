const express = require('express');

const router = express.Router();

router.get('/isup', (req, res) => {
  res.json({ message: "I'm alive" });
});

module.exports = router;
