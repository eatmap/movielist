import { Heading } from '@chakra-ui/react';

const HeaderText = () => {
  return (
    <Heading textAlign="center" my={2}>
      Movie<span style={{ color: 'red' }}>List</span>
    </Heading>
  );
};

export default HeaderText;
