import { useForm, Controller } from 'react-hook-form';
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
  Grid,
} from '@chakra-ui/react';
import { getSortedGenres } from '../config/genres';
import { certMapping } from '../config/certifications';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

// import { BsChevronDoubleDown, BsChevronDoubleUp } from 'react-icons/bs';

async function dummyAPICall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hola');
    }, 3000);
  });
}

export default function SearchForm({ setLoading, setMovies }) {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const animatedComponents = makeAnimated();

  async function onSubmit(values) {
    setMovies([]);
    alert(JSON.stringify(values, null, 2));
    await dummyAPICall();
  }

  // const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setLoading(isSubmitting);
  }, [isSubmitting, setLoading]);

  const VALID_RELEASE_YEAR = new Date().getFullYear();

  const genreOptions = getSortedGenres().map((x) => {
    return {
      value: x[0],
      label: x[1],
    };
  });

  return (
    <Box bg="white" p="5">
      <Heading textAlign="center">Search Movies</Heading>

      <Divider my="3" />

      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        px="5"
        margin="auto"
        // h={hidden ? '0' : 'auto'}
        // visibility={hidden ? 'hidden' : 'visible'}
        my="2"
      >
        <Grid
          templateColumns={{ base: '1fr', lg: '2fr 1fr 1fr' }}
          gridColumnGap={[5, null, 10]}
        >
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
                  placeholder="e.g. 1"
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
                  placeholder="e.g. 8"
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
        </Grid>

        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gridColumnGap={[5, null, 10]}
          mt="4"
        >
          {/* Genres */}
          <FormControl isInvalid={errors.genres}>
            <FormLabel htmlFor="genres">Genres</FormLabel>

            <Controller
              name="genres"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => {
                return (
                  <Select
                    options={genreOptions}
                    placeholder={'Pick genre(s)'}
                    isMulti={true}
                    components={animatedComponents}
                    onChange={(options) =>
                      onChange(options?.map((option) => option.value))
                    }
                    onBlur={onBlur}
                    value={genreOptions.filter((option) =>
                      value?.includes(option.value),
                    )}
                  />
                );
              }}
            />

            <FormErrorMessage>
              {errors.genres && errors.genres.message}
            </FormErrorMessage>
          </FormControl>

          {/* Certification */}
          <FormControl isInvalid={errors.certifcation}>
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
        </Grid>

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
            loadingText="Searching..."
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
