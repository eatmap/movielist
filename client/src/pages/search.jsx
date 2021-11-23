import { Heading, Box, Grid } from '@chakra-ui/react';

import Navbar from '../components/Navbar';
import SearchForm from '../components/SearchForm';

// import { showSuccessMessage, showErrorMessage } from '../utils/toast';

function SearchPage() {
  return (
    <Box>
      <Navbar />

      <SearchForm />
      <Box bg="gray.100" minH="50vh" py="5">
        Results here
      </Box>
    </Box>
  );
}

export default SearchPage;
