const { Router } = require('express');

const fetch = require('cross-fetch');

const router = Router();

const apiKey = '3801f3011e99b216b37a40b6358a7105';

router.post('/', async (req, res) => {
  const { filters } = req.body;

  /**
   * Documentation - https://developers.themoviedb.org/3/discover/movie-discover
   */

  // Get keyword integer ids from text search
  const keywordResponse = await fetch('https://api.themoviedb.org/3/search/keyword?api_key=' + apiKey + '&query=' + encodeURIComponent(filters.keywords) + '&page=1');
  const keywordJSON = await keywordResponse.json();

  keywordIds = '';
  for (key in keywordJSON.results) {
    keywordIds = keywordIds.concat(String(keywordJSON.results[key]['id']) + '|');
  }

  // Set highest certification level based on filter
  maxCertification = 'NC-17';
  if (filters.certification.length > 0) {
    maxCertification = filters.certification.at(-1);
  }

  // Get movie discover search results
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + 
  '&language=en-US&sort_by=popularity.desc&certification_country=US' + 
  '&certification.lte=' + encodeURIComponent(maxCertification) + '&include_adult=false&include_video=false&page=1' + 
  '&primary_release_date.gte=' + encodeURIComponent(filters.minReleaseYear) + 
  '&primary_release_date.lte=' + encodeURIComponent(filters.maxReleaseYear) + 
  '&vote_average.gte=' + encodeURIComponent(filters.minRatings) + 
  '&vote_average.lte=' + encodeURIComponent(filters.maxRatings) + 
  '&with_genres=' + encodeURIComponent(filters.genres) + 
  '&with_keywords=' + encodeURIComponent(keywordIds);

  const apiResponse = await fetch(url);

  if (apiResponse.status >= 400) {
    return res.status(500).json({ message: 'Failed to retrieve movies' });
  }

  const apiJSON = await apiResponse.json();

  return res.status(200).json({
    movies: apiJSON.results,
  });
});

module.exports = router;
