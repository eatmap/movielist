import { Text, Box, Flex, Spacer, Button, Link } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { showSuccessMessage, showErrorMessage } from '../utils/toast';
import { logout } from '../actions/authentication';

export default function Navbar() {
  const navigate = useNavigate();

  const onLogout = () => {
    logout()
      .then(() => {
        showSuccessMessage('Successfully logged out from the application');
        navigate('/login');
      })
      .catch((e) => {
        showErrorMessage(e.message);
      });
  };
  return (
    <Box px={5} boxShadow="md" borderBottom="1px" borderColor="gray.100">
      <Flex alignItems="center">
        <Link as={RouterLink} to="/" _hover={{ textTransform: 'none' }}>
          <HeaderText />
        </Link>

        <Spacer />
        <Button as={RouterLink} to="/watchlist" colorScheme="messenger" mr="5">
          My Watchlist
        </Button>
        <Button onClick={onLogout}>Logout</Button>
      </Flex>
    </Box>
  );
}
