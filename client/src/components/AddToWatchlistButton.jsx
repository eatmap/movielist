import {
  Box,
  Spinner,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { addToWatchlist, GetWatchlists } from '../actions/watchlist';
import { showErrorMessage, showSuccessMessage } from '../utils/toast';

export default function AddToWatchlistButton({ movie }) {
  const { watchlists, error, isLoading } = GetWatchlists();

  let menuListContent = (
    <Box d="flex" justifyContent="center" py="3">
      {error?.message || 'Failed to find watchlists'}
    </Box>
  );

  if (isLoading) {
    menuListContent = (
      <Box d="flex" justifyContent="center" py="3">
        <Spinner textAlign="center" />
      </Box>
    );
  }

  if (watchlists && watchlists.length === 0) {
    menuListContent = (
      <Box d="flex" justifyContent="center" py="3">
        No watchlists found
      </Box>
    );
  } else {
    const { id, poster_path, title } = movie;
    menuListContent =
      watchlists &&
      watchlists.map((x) => {
        return (
          <MenuItem
            key={x.id}
            _hover={{ bg: 'gray.700', color: 'white' }}
            _focus={{ bg: 'gray.700', color: 'white' }}
            _active={{ bg: 'gray.700', color: 'white' }}
            onClick={() => {
              addToWatchlist(id, title, poster_path, x.id)
                .then(() => showSuccessMessage(`Added to watchlist: ${x.name}`))
                .catch((e) => {
                  showErrorMessage(e.message || 'Failed to add to watchlist');
                });
            }}
          >
            {x.name}
          </MenuItem>
        );
      });
  }

  return (
    <Menu isLazy>
      <MenuButton as={Button} colorScheme="messenger">
        + Add to watchlist
      </MenuButton>
      <MenuList bg="black.400" borderColor="gray.700">
        {menuListContent}
      </MenuList>
    </Menu>
  );
}
