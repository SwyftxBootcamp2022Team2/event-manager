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
  Text,
  Image,
  Heading,
  HStack,
  Center,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import PancakePhoto from '../assets/pancake.jpeg';

function BookEventModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = {
    title: 'Pancake Tuesday',
    image: PancakePhoto,
  };

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
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent maxH="85%">
        <ModalHeader paddingBottom="25px" paddingTop="40px">
          <Heading>Pancake Tuesday</Heading>
        </ModalHeader>

        <ModalCloseButton size="lg" m="25px" />

        <ModalBody>
          <HStack>
            <Image
              alignContent="center"
              boxSize="sm"
              src={data.image}
              alt="Dan Abramov"
              fit="cover"
              borderRadius={5}
            />
            <Center h="100%" w="100%">
              <Text>Hello World {id}</Text>
            </Center>
          </HStack>
        </ModalBody>

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
