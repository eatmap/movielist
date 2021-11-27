const User = require('../models/user');

async function getWatchList(username) {
  if (!username) {
    throw Error('Please provide a valid username');
  }
  const user = await User.findOne({ username }).exec();
  return user.watchList;
}

// Add movie to the the watchlist. If it already exists, update existing record
async function addToWatchlist(username, movieId, movieTitle, moviePosterPath) {
  if (!username || !movieId || !movieTitle || !moviePosterPath) {
    throw Error('Please provide the correct parameters.');
  }

  // Get the watchlist of the user
  const user = await User.findOne({ username });

  const newWatchList = user.watchList || [];
  const movieIndex = user.watchList.findIndex((x) => x.movieId === movieId);

  const upsertData = {
    movieId,
    movieTitle,
    moviePosterPath,
  };

  // New movie. Add it to the list
  if (movieIndex === -1) {
    newWatchList.push(upsertData);
  } else {
    newWatchList[movieIndex] = upsertData;
  }

  user.watchList = newWatchList;
  await user.save();
}

// Delete movie from watchlist if it exists
async function removeFromWatchlist(username, movieId) {
  if (!username || !movieId) {
    throw Error('Please provide the correct parameters.');
  }

  const user = await User.findOne({ username });

  const newWatchList = (user.watchList || []).filter(
    (x) => x.movieId !== movieId,
  );

  user.watchList = newWatchList;
  await user.save();
}

module.exports = {
  addToWatchlist,
  getWatchList,
  removeFromWatchlist,
};
