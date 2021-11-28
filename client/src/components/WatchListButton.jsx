import { useState } from 'react';
import { mutate } from 'swr';
import { Button, Box, Spinner } from '@chakra-ui/react';
import { BsPlusLg, BsDashCircle } from 'react-icons/bs';

import { addToWatchlist, InWatchList } from '../actions/watchlist';
import { deleteFromWatchlist } from '../actions/watchlist';

import { showErrorMessage, showSuccessMessage } from '../utils/toast';

function updateWatchlistState(movieId) {
  mutate('/api/watchlists');
  mutate(`/api/watchlists/${movieId}/exists`);
}

function AddToWatchListButton({ movieId, movieTitle, moviePosterPath }) {
  const [loading, setLoading] = useState(false);

  const saveMovie = () => {
    setLoading(true);
    addToWatchlist(movieId, movieTitle, moviePosterPath)
      .then(() => {
        showSuccessMessage('Successfully added the movie to the watchlist');
        updateWatchlistState(movieId);
      })
      .catch((e) => {
        showErrorMessage(e.message || 'Failed to add movie to the watchlist');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      colorScheme="messenger"
      onClick={saveMovie}
      isLoading={loading}
      leftIcon={<BsPlusLg />}
      isFullWidth
    >
      Add to watchlist
    </Button>
  );
}

function DeleteFromWatchListButton({ movieId }) {
  const [loading, setLoading] = useState(false);

  const deleteMovie = () => {
    setLoading(true);
    deleteFromWatchlist(movieId)
      .then(() => {
        showSuccessMessage('Successfully removed the movie from the watchlist');
        updateWatchlistState(movieId);
      })
      .catch((e) => {
        showErrorMessage(e.message || 'Failed to remove the movie from the watchlist');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      colorScheme="whiteAlpha"
      onClick={deleteMovie}
      isLoading={loading}
      leftIcon={<BsDashCircle />}
      isFullWidth
    >
      Remove from watchlist
    </Button>
  );
}

export default function WatchListButton({
  movieId,
  movieTitle,
  moviePosterPath,
}) {
  const { exists, isLoading, error } = InWatchList(movieId);

  if (isLoading) {
    return (
      <Button colorScheme="messenger" isLoading={isLoading} isFullWidth>
        <Spinner />
      </Button>
    );
  }

  if (error) {
    return (
      <Box d="flex" justifyContent="center" py="3">
        {error?.message || 'Failed to find watchlists'}
      </Box>
    );
  }

  if (exists) {
    return <DeleteFromWatchListButton movieId={movieId} />;
  }

  return (
    <AddToWatchListButton
      movieId={movieId}
      movieTitle={movieTitle}
      moviePosterPath={moviePosterPath}
    />
  );
}
