import { Heading, Box, Divider } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      backgroundImage="/background/movie-grid.jpg"
      backgroundSize="cover"
    >
      <Box
        bg="white"
        p="5"
        display="flex"
        alignItems="center"
        flexDir="column"
        maxW="500px"
        w="90%"
        borderRadius="lg"
        boxShadow="xl"
      >
        <HeaderText />
        <Divider />
        <Heading size="md" as="h2" my={4}>
          Register
        </Heading>
        <RegisterForm />
      </Box>
    </Box>
  );
}

export default RegisterPage;
