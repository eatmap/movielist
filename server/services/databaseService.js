async function getWatchList(username) {
  if (!username) {
    throw Error('Please provide a valid username');
  }
  const user = await User.findOne({ username }).exec();
  return user.watchList;
}

async function addToWatchlist(username, movieId, movieTitle, moviePosterPath) {
  if (!username || !movieId || !movieTitle || !moviePosterPath) {
    throw Error('Please provide the correct parameters.');
  }

  await User.update(
    { username },
    {
      $push: {
        watchList: {
          movieId: movieId,
          movieTitle: movieTitle,
          moviePosterPath: moviePosterPath,
        },
      },
    },
  );
}

async function removeFromWatchlist(username, movieId) {
  if (!username || !movieId) {
    throw Error('Please provide the correct parameters.');
  }

  await User.updateOne(
    { username },
    {
      $pull: {
        watchlist: {
          id: movieId,
        },
      },
    },
  );
}

module.exports = {
  addToWatchlist,
  getWatchList,
  removeFromWatchlist,
};
