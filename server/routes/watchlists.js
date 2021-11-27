const { Router } = require('express');

const { authenticate } = require('../auth');

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    // TODO - Get all watchlists for the above user from the database
    const mockList = [
      { id: '123', name: 'Favorites' },
      { id: '324', name: 'Christmas Special' },
    ];

    return res.status(200).json({ result: mockList });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to retrieve watchlists' });
  }
});

module.exports = router;
