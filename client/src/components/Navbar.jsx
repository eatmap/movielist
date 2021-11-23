import { Text, Box, Flex, Spacer, Button } from '@chakra-ui/react';
import HeaderText from '../components/HeaderText';
import { useNavigate } from 'react-router';
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
    <Box
      px={5}
      boxShadow="md"
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Flex alignItems="center">
        <HeaderText />
        <Spacer />
        <Text mr="5">My Watchlist</Text>
        <Button onClick={onLogout}>Logout</Button>
      </Flex>
    </Box>
  );
}
