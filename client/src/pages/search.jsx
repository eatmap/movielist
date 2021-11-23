import { Heading, Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
// import { showSuccessMessage, showErrorMessage } from '../utils/toast';

function SearchPage() {
  return (
    <Box>
      <Navbar />

      <Box py="5" bg="gray.200" minH="100vh">
        <Heading textAlign="center">Search Movies</Heading>
      </Box>
    </Box>
  );
}

export default SearchPage;
