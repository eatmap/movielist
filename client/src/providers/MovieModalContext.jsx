import React, { createContext, useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import MovieDetails from '../components/MovieDetails';

export const MovieModalContext = createContext({});

export const MovieModalProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeMovie, setActiveMovie] = useState(-1);

  const closeModal = () => {
    setActiveMovie(-1);
    onClose();
  };

  const showDetails = (id) => {
    setActiveMovie(id);
    onOpen();
  };

  return (
    <MovieModalContext.Provider value={{ showDetails }}>
      {children}
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
    </MovieModalContext.Provider>
  );
};
