import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

function BookEventModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = { title: 'Pancake Tuesday' };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        navigate(-1);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Hello World {id}</ModalBody>
        <ModalFooter>
          <Button
            bg="#0072ed"
            color="white"
            mr={3}
            onClick={() => {
              // eslint-disable-next-line no-alert
              window.alert('You have rsvpd');
              onClose();
            }}
          >
            RSVP
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookEventModal;
