const { Router } = require('express');

const mockDetail = require('./mock/details');
const mockProviders = require('./mock/providers');
const mockTrailer = require('./mock/videos');

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
  const apiResponse = mockDetail;

  // Mock API call failure
  if (Math.random() < 0.1) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  }

  return res.status(200).json({
    result: apiResponse,
  });
});

router.get('/:id/providers', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * TODO - Make API calls to get watch providers for the provided movie id
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-watch-providers
   */
  const apiResponse = mockProviders;

  // Mock API call failure
  if (Math.random() < 0.1) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve providers for ${movieId}` });
  }

  const providers = apiResponse.results['US'];

  return res.status(200).json({
    result: providers,
  });
});

router.get('/:id/trailer', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * TODO - Make API calls to get trailer for the provided movie id
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-videos
   */
  const apiResponse = mockTrailer;

  // Mock API call failure
  if (Math.random() < 0.1) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve trailers for ${movieId}` });
  }

  const youtubeVideos = apiResponse.results.filter(
    (x) => x.site === 'YouTube' && x.official,
  );

  let result = null;
  if (youtubeVideos.length > 0) {
    result = youtubeVideos[0];
  }

  return res.status(200).json({
    result,
  });
});

module.exports = router;
