import { Box, Image } from '@chakra-ui/react';
import { useContext } from 'react';
import { MovieModalContext } from '../providers/MovieModalContext';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
  const { showDetails } = useContext(MovieModalContext);
  const posterSrc = `${POSTER_BASE_URL}${movie.poster_path}`;

  return (
    <Box
      h="325px"
      w="100%"
      maxW="225px"
      mx="auto"
      bg="white"
      boxShadow="md"
      borderRadius="lg"
      _hover={{ boxShadow: 'xl' }}
      transition="all 0.25s ease"
      cursor="pointer"
      onClick={() => {
        showDetails(movie.id);
      }}
    >
      <Image
        src={posterSrc}
        alt={movie.title}
        title={movie.title}
        w="100%"
        h="100%"
        objectFit="cover"
        borderRadius="lg"
      />
    </Box>
  );
}
