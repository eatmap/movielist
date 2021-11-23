const { Router } = require('express');

const mockResult = require('./mock/search');

const router = Router();

router.post('/', async (req, res) => {
  const { filters } = req.body;

  /**
   * TODO - Make API call to find movies based on provided filters
   * Documentation - https://developers.themoviedb.org/3/discover/movie-discover
   */

  // Mock API call failure
  if (Math.random() < 0.3) {
    return res.status(500).json({ message: 'Failed to retrieve movies' });
  }

  return res.status(200).json({
    movies: mockResult.results,
  });
});

module.exports = router;
