import { Box, Text, Spinner, SimpleGrid } from '@chakra-ui/react';
import { BsInfoCircle } from 'react-icons/bs';
import MovieCard from './MovieCard';

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

  return (
    <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} w="100%" spacing="5">
      {movies.map((x) => (
        <MovieCard key={x.id} movie={x} />
      ))}
    </SimpleGrid>
  );
}
