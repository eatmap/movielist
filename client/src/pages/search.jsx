import { Heading, Box, Grid } from '@chakra-ui/react';
import { useState } from 'react';
import MovieGrid from '../components/MovieGrid';

import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';

// import { showSuccessMessage, showErrorMessage } from '../utils/toast';

function SearchPage() {
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  return (
    <Box>
      <Navbar />

      <SearchForm setLoading={setLoading} setMovies={setMovies} />
      <Box bg="gray.100" minH="60vh" py="5" d="flex" justifyContent="center" alignItems="center">
        <MovieGrid isLoading={loading} movies={movies} />
      </Box>
    </Box>
  );
}

export default SearchPage;
