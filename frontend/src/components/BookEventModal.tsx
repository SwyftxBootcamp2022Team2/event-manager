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
  // getBookingStatus,
  // getEventDetails,
  // getTotalBookings,
  makeBooking,
} from '../api/sessions';
import { MyEvent, EventBooking } from '../types/types';
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

  function createBooking() {
    // make booking
    user
      ? makeBooking(id, user.email) //user.email
          .then((data) => {
            toast({
              title: `${eventBooking[2]?.title} booking confirmed`,
              status: 'success',
              isClosable: true,
              position: 'top-right',
            });
          })
          .catch((error) => {
            toast({
              title: `error: ${error.response.data}`,
              status: 'error',
              isClosable: true,
              position: 'top-right',
            });
          })
      : navigate('/login');
    // show  booking confirmed toast

    //close modal window
    onClose();
    navigate(-1);
  }

  useEffect(() => {
    onOpen();
    if (user) {
      getEventBookings(id, user.email).then((data) => setEventBooking(data));
      // get details for the current event
      // getEventDetails(id)
      //   .then((data) => {
      //     setEventData(data);
      //   })
      //   .catch((error) => {
      //     toast({
      //       title: `error: ${error.response.data}`,
      //       status: 'error',
      //       isClosable: true,
      //       position: 'top-right',
      //     });
      //   });

      // // get number of bookings made for the current event
      // getTotalBookings(id)
      //   .then((data) => {
      //     setBookingCount(data);
      //   })
      //   .catch((error) => {
      //     toast({
      //       title: `error: ${error.response.data}`,
      //       status: 'error',
      //       isClosable: true,
      //       position: 'top-right',
      //     });
      //   });

      // // get whether user has booked this event
      // getBookingStatus(id, user.email)
      //   .then((data) => {
      //     setBookingStatus(data);
      //   })
      //   .catch((error) => {
      //     toast({
      //       title: `error: ${error.response.data}`,
      //       status: 'error',
      //       isClosable: true,
      //       position: 'top-right',
      //     });
      //   });
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
      <ModalContent maxH="90%">
        <ModalHeader paddingBottom="25px" paddingTop="40px">
          <Heading>{eventBooking[2]?.title}</Heading>
        </ModalHeader>

        <ModalCloseButton size="lg" m="25px" />

        <ModalBody>
          <Flex flexDirection="row" alignItems="center">
            <Image
              alignContent="center"
              boxSize="50%"
              src={DummyPhoto}
              // src={eventData.image}
              alt="Dummy photo of swyftx bird"
              borderRadius={5}
            />
            <Flex flexDirection="column">
              <Feature icon={<Calendar color="white" size="20px" />}>
                <Text fontSize="xl">{dayjs().format('dddd, MMMM D YYYY')}</Text>
              </Feature>
              <Feature icon={<Location color="white" size="20px" />}>
                <Text fontSize="xl">{eventBooking[2]?.location}</Text>
              </Feature>
              <Feature icon={<Group color="white" size="20px" />}>
                <Text fontSize="xl">
                  {eventBooking &&
                    `${
                      eventBooking[2].participationLimit - eventBooking[0]
                    } / ${eventBooking[2].participationLimit} spots left`}
                </Text>
              </Feature>
              <Box maxH="500px" overflow="scroll" p="3">
                <Text fontSize="md">{eventBooking[2]?.description}</Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={eventBooking[1] ? '#0072ed' : '#edbd64'}
            color="white"
            mr={3}
            onClick={eventBooking[1] ? createBooking : () => alert("unrsvp'd")}
          >
            {eventBooking[1] ? 'RSVP' : 'UN-RSVP'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BookEventModal;
