const { Router } = require('express');

const mockDetail = require('./mock/details');
const mockProviders = require('./mock/providers');

const router = Router();

/**
 * This middleware verifies the provided movie id is valid
 */
function verifyMovieId(req, res, next) {
  const movieId = req.params.id;
  if (movieId <= 0) {
    return res.status(404).json({ message: 'Please provide a valid movie id' });
  }

  return next();
}

router.get('/:id/details', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * TODO - Make API calls to get details for the provided movie id
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-details
   */

  // Mock API call failure
  if (Math.random() < 0.1) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  }

  return res.status(200).json({
    result: mockDetail,
  });
});

router.get('/:id/providers', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * TODO - Make API calls to get watch providers for the provided movie id
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-watch-providers
   */

  // Mock API call failure
  if (Math.random() < 0.1) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve providers for ${movieId}` });
  }
  const apiResponse = mockProviders;
  const providers = apiResponse.results['US'];

  return res.status(200).json({
    result: providers,
  });
});

module.exports = router;
