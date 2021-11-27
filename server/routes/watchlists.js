const { Router } = require('express');
const {
  addToWatchlist,
  removeFromWatchlist,
} = require('../services/databaseService');
const { authenticate } = require('../auth');

const router = Router();

router.get('/', authenticate, async (req, res) => {
  try {
    // Get current user
    if (!req.user) {
      return res.status(400).json({
        message: 'Please provide user credentials',
      });
    }

    const watchList = req.user.watchList || [];

    return res.status(200).json({
      watchList,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to retrieve watchlists' });
  }
});

router.get('/:id/exists', authenticate, async (req, res) => {
  try {
    const movieId = req.params.id;
    const watchList = req.user.watchList || [];

    const movieExists = watchList.some((x) => x.movieId === Number(movieId));

    return res.status(200).json({
      exists: movieExists,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }
});

router.put('/', authenticate, async (req, res) => {
  const { movieId, movieTitle, moviePosterPath } = req.body;
  const { username } = req.user;

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

router.delete('/', authenticate, async (req, res) => {
  try {
    const { movieId } = req.body;
    const { username } = req.user;

    removeFromWatchlist(username, movieId);

    return res.status(200).json({
      message: 'Movie removed from watchlist.',
    });
  } catch {
    return res.status(500).json({
      message: 'Something went wrong.',
    });
  }
});

module.exports = router;
