const { Router } = require('express');

const fetch = require('cross-fetch');

const router = Router();

const apiKey = '3801f3011e99b216b37a40b6358a7105';

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
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-details
   */
  const apiResponse = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + apiKey + '&language=en-US');

  if (apiResponse.status >= 400) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  }

  const apiJSON = await apiResponse.json();

  return res.status(200).json({
    result: apiJSON,
  });
});

router.get('/:id/providers', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-watch-providers
   */
  const apiResponse = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/watch/providers?api_key=' + apiKey);

  if (apiResponse.status >= 400) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve providers for ${movieId}` });
  }

  const apiJSON = await apiResponse.json();

  // Get US watch providers
  const providers = apiJSON.results['US'];

  if (providers == null) {
    return res
    .status(500)
    .json({ message: `No US providers found for ${movieId}` });
  }


  return res.status(200).json({
    result: providers,
  });
});

router.get('/:id/trailer', verifyMovieId, async (req, res) => {
  const movieId = req.params.id;

  /**
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-videos
   */
  const apiResponse = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=' + apiKey + '&language=en-US');

  if (apiResponse.status >= 400) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve trailers for ${movieId}` });
  }

  const apiJSON = await apiResponse.json();

  // Only get official youtube trailers
  const youtubeVideos = apiJSON.results.filter(
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
