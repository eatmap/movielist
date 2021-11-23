import { useForm } from 'react-hook-form';
import {
  Heading,
  Box,
  Checkbox,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Text,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import { getSortedGenres } from '../config/genres';
import { certMapping } from '../config/certifications';
import { useState } from 'react';
import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

export default function SearchForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    alert(JSON.stringify(values, null, 2));
  }

  const [hidden, setHidden] = useState(false);

  const VALID_RELEASE_YEAR = new Date().getFullYear();

  return (
    <Box bg="white" p="5">
      <Heading textAlign="center">Search Movies</Heading>

      <Divider my="3" />

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        px="5"
        margin="auto"
        h={hidden ? '0' : 'auto'}
        visibility={hidden ? 'hidden' : 'visible'}
        transition="height 0.5s"
        my="2"
      >
        <SimpleGrid columns={[1, null, 3]} spacing={[5, null, 10]}>
          {/* Keywords field */}
          <FormControl isInvalid={errors.keywords}>
            <FormLabel htmlFor="username">Keywords</FormLabel>
            <Input
              id="keywords"
              placeholder="e.g. Space"
              type="text"
              {...register('keywords')}
            />
            <FormErrorMessage>
              {errors.keywords && errors.keywords.message}
            </FormErrorMessage>
          </FormControl>

          {/* Release Year Fields */}
          <Box>
            <FormControl isInvalid={errors.year}>
              <FormLabel htmlFor="releaseYear">Release Year</FormLabel>
            </FormControl>
            <Flex>
              <FormControl isInvalid={errors.minReleaseYear}>
                <Input
                  id="minReleaseYear"
                  placeholder="e.g. 1998"
                  type="number"
                  {...register('minReleaseYear', {
                    max: {
                      value: VALID_RELEASE_YEAR,
                      message: `Min release year can be at most ${VALID_RELEASE_YEAR}`,
                    },
                    min: {
                      value: 1900,
                      message: `Min release year can be at least 1900`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.minReleaseYear && errors.minReleaseYear.message}
                </FormErrorMessage>
              </FormControl>
              <Text fontSize="2xl" mx="2">
                -
              </Text>
              <FormControl isInvalid={errors.maxReleaseYear}>
                <Input
                  id="maxReleaseYear"
                  placeholder="e.g. 2021"
                  type="number"
                  {...register('maxReleaseYear', {
                    max: {
                      value: VALID_RELEASE_YEAR,
                      message: `Max release year can be at most ${VALID_RELEASE_YEAR}`,
                    },
                    min: {
                      value: 1900,
                      message: `Max release year can be at least 1900`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.maxReleaseYear && errors.maxReleaseYear.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Box>

          {/* Ratings Fields */}
          <Box>
            <FormControl isInvalid={errors.ratings}>
              <FormLabel htmlFor="releaseYear">Ratings</FormLabel>
            </FormControl>
            <Flex>
              <FormControl isInvalid={errors.minRatings}>
                <Input
                  id="minRatings"
                  placeholder="min ratings (e.g. 1)"
                  type="number"
                  {...register('minRatings', {
                    max: {
                      value: 10,
                      message: `Minimum ratings can be at most 10`,
                    },
                    min: {
                      value: 0,
                      message: `Minimum ratings must be at least 0`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.minRatings && errors.minRatings.message}
                </FormErrorMessage>
              </FormControl>
              <Text fontSize="2xl" mx="2">
                -
              </Text>
              <FormControl isInvalid={errors.maxRatings}>
                <Input
                  id="maxRatings"
                  placeholder="min ratings (e.g. 8)"
                  type="number"
                  {...register('maxRatings', {
                    max: {
                      value: 10,
                      message: `Maximum ratings can be at most 10`,
                    },
                    min: {
                      value: 0,
                      message: `Maximum ratings can can be at least 0`,
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.maxRatings && errors.maxRatings.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Genres */}
        <FormControl isInvalid={errors.genres} mt="2">
          <FormLabel htmlFor="genres">Genres</FormLabel>

          <SimpleGrid columns={[2, null, 6]}>
            {getSortedGenres().map((x) => {
              const genreId = x[0];
              const genreTitle = x[1];
              return (
                <Checkbox {...register('genres')} value={genreId} key={genreId}>
                  {genreTitle}
                </Checkbox>
              );
            })}
          </SimpleGrid>

          <FormErrorMessage>
            {errors.genres && errors.genres.message}
          </FormErrorMessage>
        </FormControl>

        {/* Certification */}
        <FormControl isInvalid={errors.certifcation} mt="2">
          <FormLabel htmlFor="certification">Certification</FormLabel>

          <SimpleGrid columns={[2, null, 6]}>
            {Object.entries(certMapping).map((x) => {
              const certId = x[0];
              const certTitle = x[1];
              return (
                <Checkbox
                  {...register('certification')}
                  value={certTitle}
                  key={certId}
                >
                  {certTitle}
                </Checkbox>
              );
            })}
          </SimpleGrid>

          <FormErrorMessage>
            {errors.certification && errors.certification.message}
          </FormErrorMessage>
        </FormControl>

        <Box
          display="flex"
          alignItems="center"
          mt={4}
          justifyContent="space-between"
        >
          <Button variant="link" onClick={() => reset({})}>
            Clear Filters
          </Button>
          <Button
            colorScheme="messenger"
            isLoading={isSubmitting}
            type="submit"
          >
            Show Results
          </Button>
        </Box>
      </Box>

      {/* <Box
        onClick={() => setHidden(!hidden)}
        display="block"
        w="100%"
        textAlign="center"
        d="flex"
        justifyContent="center"
        bg="gray.100"
        p="2"
      >
        {hidden ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />}
      </Box> */}
    </Box>
  );
}
