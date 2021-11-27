const { Router } = require('express');

const fetch = require('cross-fetch');
const { authenticate } = require('../auth');

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

router.get('/:id/details', verifyMovieId, authenticate, async (req, res) => {
  const movieId = req.params.id;

  /**
   * Documentation - https://developers.themoviedb.org/3/movies/get-movie-details
   */
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const apiResponse = await fetch(url);

    if (apiResponse.status === 200) {
      const apiJSON = await apiResponse.json();

      return res.status(200).json({
        result: apiJSON,
      });
    }
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve movie details for ${movieId}` });
  }
});

router.get('/:id/providers', verifyMovieId, authenticate, async (req, res) => {
  const movieId = req.params.id;

  try {
    /**
     * Documentation - https://developers.themoviedb.org/3/movies/get-movie-watch-providers
     */
    const url = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`;
    const apiResponse = await fetch(url);

    if (apiResponse.status === 200) {
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
    }

    return res
      .status(500)
      .json({ message: `Failed to retrieve providers for ${movieId}` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve providers for ${movieId}` });
  }
});

router.get('/:id/trailer', verifyMovieId, authenticate, async (req, res) => {
  const movieId = req.params.id;

  try {
    /**
     * Documentation - https://developers.themoviedb.org/3/movies/get-movie-videos
     */
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;
    const apiResponse = await fetch(url);

    if (apiResponse.status === 200) {
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
    }

    return res
      .status(500)
      .json({ message: `Failed to retrieve trailers for ${movieId}` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Failed to retrieve trailers for ${movieId}` });
  }
});

module.exports = router;
