import { Box, Text, Spinner } from '@chakra-ui/react';
import { BsInfoCircle } from 'react-icons/bs';

export default function MovieGrid({ isLoading, movies }) {
  if (isLoading) {
    return (
      <Box d="flex" flexDir="column" alignItems="center">
        <Spinner size="xl" />
        <Text fontSize="2xl">Loading</Text>
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box d="flex" flexDir="column" alignItems="center" fontSize="2xl">
        <BsInfoCircle />
        <Text fontSize="2xl">No Movies Found</Text>
      </Box>
    );
  }

  return <h1>Movies found</h1>;
}
