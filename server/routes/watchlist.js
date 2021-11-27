const { Router } = require('express');
const { addToWatchlist, getWatchList, removeFromWatchlist } = require('../services/DatabaseService');
const { authenticate } = require('../auth');

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    // TODO - Get all watchlists for the above user from the database
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({
            message: 'Please provide user credentials',
        });
    }

    const watchList = getWatchList(username);

    return res.status(200).json({
        watchList
    });

    // return res.status(200).json({ result: mockList });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to retrieve watchlists' });
  }
});

router.put('/addToWatchlist', async (req, res) => {
  const { username, movieId, movieTitle, moviePosterPath } = req.body;

  if (!username || !movieId || !movieTitle || !moviePosterPath) {
      return res.status(400).json({
          message: 'Please provide the correct parameters.',
      });
  }

  try {
      addToWatchlist(username, movieId, movieTitle, moviePosterPath);
  } catch {
      return res.status(500).json({
          message: 'Something went wrong.',
      });
  }

  return res.status(200).json({
      message: 'Movie added to the watchlist.',
  });

});

router.delete('/removeFromWatchlist', async (req, res) => {
  const { username, movieId } = req.body;

  removeFromWatchlist(username, movieId);

  return res.status(200).json({
        message: 'Movie removed from watchlist.',
  });
});

module.exports = router;
