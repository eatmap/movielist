import { Box, Heading, Divider } from '@chakra-ui/react';
import MovieGrid from '../components/MovieGrid';
import Navbar from '../components/Navbar';
import { useWatchlist } from '../actions/watchlist';
import { useEffect } from 'react';
import { showErrorMessage } from '../utils/toast';

export default function WatchlistPage() {
  const { isLoading, error, watchlist } = useWatchlist();

  const movies = watchlist.map((movie) => ({
    id: movie.movieId,
    poster_path: movie.moviePosterPath,
    title: movie.movieTitle,
  }));

  useEffect(() => {
    if (error) {
      showErrorMessage(error.message || 'Watchlist could not be retrieved');
    }
  }, [error]);

  return (
    <Box bgColor="gray.100" h="100vh">
      <Navbar />
      <Box bg="white" p="5">
        <Heading textAlign="center">Watchlist</Heading>
      </Box>
      <Box mt={8}>
        <MovieGrid isLoading={isLoading} movies={movies} />
      </Box>
    </Box>
  );
}
