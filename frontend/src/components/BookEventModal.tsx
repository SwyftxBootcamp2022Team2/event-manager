import React, { useEffect, useState } from 'react';
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
  Box,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Calendar, Group, Location } from 'grommet-icons';
import {
  getEventBookings,
  makeBooking,
} from '../api/sessions';
import { EventBooking, ToastStatus } from '../types/types';
import useAuth from '../useAuth';
import Feature from './Feature';
import DummyPhoto from '../assets/swyftx_bird.jpeg';

function BookEventModal() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventBooking, setEventBooking] = useState<EventBooking>();

  const { user } = useAuth();
  const toast = useToast();

  const showToast = (title: string, status: ToastStatus) => toast({
    title,
    status,
    isClosable: true,
    position: 'top-right'
  });

  function createBooking() {
    if (user)
      makeBooking(id, user.email)
        .then(() => showToast(`${eventBooking?.event.title} booking confirmed`, "success"))
        .catch((error) => showToast(error.respose.data, "error"))
    else navigate('/login');

    onClose();
    navigate(-1);
  }

  useEffect(() => {
    onOpen();
    if (user) {
      getEventBookings(id, user.email).then((data) => setEventBooking(data));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        navigate(-1);
      }}
      size="5xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader py={5}>
          <Heading fontSize={30}>{eventBooking?.event.title}</Heading>
        </ModalHeader>

        <ModalCloseButton size="md" mr={2} mt={2} />

        <ModalBody>
          <Flex flexDirection="row" alignItems="start">
            <Box flex={1}>
              <Image
                src={DummyPhoto}
                alt="Dummy photo of swyftx bird"
                borderRadius={5}
              />
            </Box>
            <Flex flexDirection="column" flex={2} px={10} py={5}>
              <Feature icon={<Calendar color="white" />}>
                <Text fontSize="xl">{dayjs().format('dddd, MMMM D YYYY')}</Text>
              </Feature>
              <Feature icon={<Location color="white" />}>
                <Text fontSize="xl">{eventBooking?.event.location}</Text>
              </Feature>
              <Feature icon={<Group color="white" />}>
                <Text fontSize="xl">
                  {eventBooking &&
                    `${eventBooking.event.participationLimit - eventBooking.count
                    } / ${eventBooking.event.participationLimit} spots left`}
                </Text>
              </Feature>
              <Box mt={2} >
                <Text fontSize="md">{eventBooking?.event.description}</Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={eventBooking?.status ? '#0072ed' : '#edbd64'}
            color="white"
            mr={3}
            // TODO: un-rsvp backend integration
            onClick={eventBooking?.status ? createBooking : () => console.log("unrsvp'd")}
          >
            {eventBooking?.status ? 'RSVP' : 'UN-RSVP'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookEventModal;
