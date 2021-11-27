const { Router } = require('express');

const fetch = require('cross-fetch');
const { authenticate } = require('../auth');

const router = Router();

const apiKey = '3801f3011e99b216b37a40b6358a7105';

async function getKeywordIds(keywords) {
  // Get keyword integer ids from text search
  const keywordResponse = await fetch(
    'https://api.themoviedb.org/3/search/keyword?api_key=' +
      apiKey +
      '&query=' +
      encodeURIComponent(keywords) +
      '&page=1',
  );
  const keywordJSON = await keywordResponse.json();

  return keywordJSON.results.map((x) => x.id);
}

router.post('/', authenticate, async (req, res) => {
  const { filters } = req.body;

  if (!filters) {
    return res.status(400).json({ message: 'Please specify search filters' });
  }

  try {
    /**
     * Documentation - https://developers.themoviedb.org/3/discover/movie-discover
     */

    let searchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    // Set default sort by desecending popularity
    searchUrl += '&sort_by=popularity.desc';

    // set search to US region
    searchUrl += '&language=en-US&certification_country=US';

    // Exlude videos and adult movies
    searchUrl += '&include_adult=false&include_video=false';

    // Set certifications if required
    if (filters?.certification?.length > 0) {
      // Check for single or multiple certifications
      if (filters?.certification?.length == 1) {
        const certification = filters.certification.at(-1);
        searchUrl += `&certification=${encodeURIComponent(certification)}`;
      } else {
        const certificationLte = filters.certification.at(-1);
        const certificationGte = filters.certification.at(0);
        searchUrl += `&certification.lte=${encodeURIComponent(certificationLte)}` +
        `&certification.gte=${encodeURIComponent(certificationGte)}`;
      }
    }

    // Set release date constraints
    if (filters.minReleaseYear) {
      searchUrl += `&primary_release_date.gte=${encodeURIComponent(
        filters.minReleaseYear,
      )}`;
    }

    if (filters.maxReleaseYear) {
      searchUrl +=
        '&primary_release_date.lte=' +
        encodeURIComponent(filters.maxReleaseYear);
    }

    // Set ratings constraints
    if (filters.minRatings) {
      searchUrl +=
        '&vote_average.gte=' + encodeURIComponent(filters.minRatings);
    }

    if (filters.maxRatings) {
      searchUrl +=
        '&vote_average.lte=' + encodeURIComponent(filters.maxRatings);
    }

    // Set genres
    if (filters.genres) {
      searchUrl += '&with_genres=' + encodeURIComponent(filters.genres);
    }

    // Set keywords
    if (filters.keywords) {
      const keywordIds = await getKeywordIds(filters.keywords);
      searchUrl += '&with_keywords=' + encodeURIComponent(keywordIds.join('|'));
    }

    const apiResponse = await fetch(searchUrl);

    if (apiResponse.status === 200) {
      const apiJSON = await apiResponse.json();

      return res.status(200).json({
        movies: apiJSON.results,
      });
    }

    return res.status(500).json({ message: 'Failed to retrieve movies' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Failed to retrieve movies' });
  }
});

module.exports = router;
