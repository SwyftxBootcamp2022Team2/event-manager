import React, { useEffect, useState } from 'react';
import useAuth from '../useAuth';
import { MyEvent } from '../types/types';
import * as sessionsApi from '../api/sessions';
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
import LoremIpsum from 'react-lorem-ipsum';
import Feature from './Feature';
import PancakePhoto from '../assets/pancake.jpeg';

function BookEventModal() {
  // eslint-disable-next-line no-unused-vars
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventData, setEventData] = useState<MyEvent | undefined>();
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    onOpen();
    console.log(id);
    user
      ? sessionsApi.getEventDetails(id).then((data) => {
          console.log(data);
          setEventData(data);
        })
      : navigate('/login');
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
          <Heading>Pancake Tuesday</Heading>
        </ModalHeader>

        <ModalCloseButton size="lg" m="25px" />

        <ModalBody>
          <Flex flexDirection="row" alignItems="center">
            <Image
              alignContent="center"
              boxSize="50%"
              src={eventData.image}
              alt="Dan Abramov"
              borderRadius={5}
            />
            <Flex flexDirection="column">
              <Feature icon={<Calendar color="white" size="20px" />}>
                <Text fontSize="xl">{dayjs().format('dddd, MMMM D YYYY')}</Text>
              </Feature>
              <Feature icon={<Location color="white" size="20px" />}>
                <Text fontSize="xl">Kitchen</Text>
              </Feature>
              <Feature icon={<Group color="white" size="20px" />}>
                <Text fontSize="xl">4 spots left</Text>
              </Feature>
              <Box maxH="500px" overflow="scroll" p="3">
                <Text fontSize="md">
                  <LoremIpsum
                    p={5}
                    avgWordsPerSentence={7}
                    avgSentencesPerParagraph={6}
                  />
                </Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="#0072ed"
            color="white"
            mr={3}
            onClick={() => {
              toast({
                title: `${eventData.title} booking confirmed`,
                status: 'success',
                isClosable: true,
                position: 'top-right',
                containerStyle: {
                  maxWidth: '15%',
                  marginRight: '10%',
                  marginTop: '15%',
                },
              });

              onClose();
              navigate(-1);
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