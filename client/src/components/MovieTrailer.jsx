import { Box, Spinner } from '@chakra-ui/react';
import { GetMovieTrailer } from '../actions/movie';

export default function MovieTrailer({ id }) {
  const { data, isLoading, error } = GetMovieTrailer(id);

  if (isLoading) {
    return (
      <Box
        d="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        p="5"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!error && data) {
    const watchKey = data.key;

    return (
      <Box overflow="hidden" position="relative" height="0" pb="56.25%" my="3">
        <Box
          as="iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${watchKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
          left="0"
          top="0"
          position="absolute"
        />
      </Box>
    );
  }

  return null;
}
