import {
  Box,
  Text,
  Spinner,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';

export default function MovieGrid({ isLoading, movies }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeMovie, setActiveMovie] = useState(-1);

  const closeModal = () => {
    setActiveMovie(-1);
    onClose();
  };

  if (isLoading) {
    return (
      <Box d="flex" flexDir="column" alignItems="center">
        <Spinner size="xl" />
        <Text fontSize="2xl">Loading</Text>
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box d="flex" flexDir="column" alignItems="center" fontSize="2xl">
        <BsInfoCircle />
        <Text fontSize="2xl">No Movies Found</Text>
      </Box>
    );
  }

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} w="100%" spacing="5">
        {movies.map((x) => (
          <MovieCard
            key={x.id}
            movie={x}
            onClick={() => {
              setActiveMovie(x.id);
              onOpen();
            }}
          />
        ))}
      </SimpleGrid>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        isCentered
        motionPreset="slideInBottom"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent bg="black" textColor="white">
          <ModalCloseButton />
          <ModalBody textColor="white" minH="300px" p="0">
            <MovieDetails id={activeMovie} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
