import { Box, Text, Spinner, Heading, Link } from '@chakra-ui/react';
import { BsXCircle } from 'react-icons/bs';

import { GetMovieDetails } from '../actions/movie';
import { getMovieReleaseYear, getMovieRuntime } from '../utils/movie';
import MovieProviders from './MovieProviders';

import { BiTimeFive, BiCalendarAlt, BiStar } from 'react-icons/bi';

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w780';

function Backdrop({ imgPath }) {
  if (imgPath) {
    const url = `${BACKDROP_BASE_URL}${imgPath}`;

    return (
      <Box
        pb="300px"
        backgroundImage={url}
        backgroundPosition="center center"
        backgroundSize="cover"
        borderRadius="lg"
      ></Box>
    );
  }

  return <Box pb="50px"></Box>;
}

function Genres({ genres }) {
  const formattedGenres = genres.map((x) => x.name).join(',  ');
  return (
    <Text fontSize="sm" color="#8f8f8f">
      {formattedGenres}
    </Text>
  );
}

function MetadataInfo({ icon, value }) {
  return (
    <Box mr="3" d="flex" alignItems="center">
      <Text mr="1">{icon}</Text>
      {value}
    </Box>
  );
}

function Metadata({ runtime, releaseDate, voteAverage }) {
  const releaseYear = getMovieReleaseYear(releaseDate);
  const formattedRuntime = getMovieRuntime(runtime);
  return (
    <Box fontSize="xs" my="1" d="flex">
      {formattedRuntime && (
        <MetadataInfo icon={<BiTimeFive />} value={formattedRuntime} />
      )}
      {releaseYear && (
        <MetadataInfo icon={<BiCalendarAlt />} value={releaseYear} />
      )}
      {voteAverage && <MetadataInfo icon={<BiStar />} value={voteAverage} />}
    </Box>
  );
}

export default function MovieDetails({ id }) {
  const { movie, isLoading, error } = GetMovieDetails(id);

  if (error) {
    return (
      <Box
        d="flex"
        flexDir="column"
        alignItems="center"
        fontSize="xl"
        p="5"
        mt="75px"
      >
        <Text fontSize="3xl" my="4">
          <BsXCircle />
        </Text>
        <Text>{error.message}</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        d="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        p="5"
        mt="100px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  const {
    title,
    backdrop_path,
    genres,
    overview,
    release_date,
    runtime,
    vote_average,
  } = movie;

  return (
    <Box>
      <Backdrop imgPath={backdrop_path} />
      <Box px="5" pb="10" pt="2">
        <Heading size="lg">{title}</Heading>
        <Metadata
          runtime={runtime}
          releaseDate={release_date}
          voteAverage={vote_average}
        />
        {genres && <Genres genres={genres} />}
        {overview && (
          <Text textColor="gray.50" fontSize="sm" my="2" maxW="500px">
            {movie.overview}
          </Text>
        )}

        <Box my="5">
          <Heading size="sm">Providers</Heading>
          <Text fontSize="xs">
            Vist{' '}
            <Link href="https://www.justwatch.com" isExternal>
              JustWatch
            </Link>{' '}
            to easily find out where you can legally watch your favorite movies
            & TV shows online.
          </Text>
          <MovieProviders id={id} />
        </Box>
      </Box>
    </Box>
  );
}
