import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { searchMovies } from '../actions/search';
import MovieGrid from '../components/MovieGrid';

import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';

import { showErrorMessage } from '../utils/toast';

function SearchPage() {
  const [gridLoading, setGridLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState({});

  const [movies, setMovies] = useState([]);

  // New search filter. Reset page to 1
  const updateFilters = (filters) => {
    setCurrentPage(1);
    setCurrentFilters(filters);
  };

  const loadAdditionalMovies = async () => {
    setLoading(true);
    try {
      const nextPage = currentPage + 1;

      const searchFilter = { ...currentFilters, page: nextPage };
      const additionalMovies = await searchMovies(searchFilter);

      setMovies([...movies, ...additionalMovies]);
      setCurrentPage(nextPage);
    } catch (e) {
      showErrorMessage(e.message || 'Movies could not be retrieved');
    } finally {
      setLoading(false);
    }
  };

  const showLoadMoreButton = movies && movies.length >= 20 && currentPage <= 5;

  return (
    <Box>
      <Navbar />

      <SearchForm
        setLoading={setGridLoading}
        setMovies={setMovies}
        setFilters={updateFilters}
        isDisabled={loading}
      />
      <Box
        bg="gray.100"
        minH="60vh"
        p="5"
        d="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <MovieGrid isLoading={gridLoading} movies={movies} />
        {showLoadMoreButton && (
          <Button
            colorScheme="messenger"
            isLoading={loading}
            my="5"
            onClick={loadAdditionalMovies}
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SearchPage;
