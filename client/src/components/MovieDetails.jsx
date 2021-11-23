import { Box, Text } from '@chakra-ui/react';
import { BsInfoCircle } from 'react-icons/bs';

export default function MovieDetails({ id }) {
  if (id <= 0) {
    return (
      <Box
        d="flex"
        flexDir="column"
        alignItems="center"
        fontSize="2xl"
        p="5"
        mt="5"
      >
        <BsInfoCircle />
        <Text>Please select a valid movie</Text>
      </Box>
    );
  }

  return <h1>{id}</h1>;
}
