import { Box, Image } from '@chakra-ui/react';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
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
    >
      <Image
        src={posterSrc}
        alt={movie.title}
        w="100%"
        h="100%"
        objectFit="cover"
        borderRadius="lg"
      />
    </Box>
  );
}
