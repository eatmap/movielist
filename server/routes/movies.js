const { Router } = require('express');

const mockDetail = require('./mock/details');

const router = Router();

router.get('/:id/details', async (req, res) => {
  const movieId = req.params.id;

  if (movieId <= 0) {
    return res.status(404).json({ message: 'Please provide a valid movie id' });
  }

  /**
   * TODO - Make API calls to get details for the provided movie id
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-details
   */

  // Mock API call failure
  if (Math.random() < 0) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  }

  return res.status(200).json({
    result: mockDetail,
  });
});

module.exports = router;
