import { Heading } from '@chakra-ui/react';

const HeaderText = () => {
  return (
    <Heading
      textAlign="center"
      my={2}
      fontFamily="'Squada One', cursive"
      size="2xl"
    >
      Movie
      <span style={{ color: '#0078ff' }}>List</span>
    </Heading>
  );
};

export default HeaderText;
