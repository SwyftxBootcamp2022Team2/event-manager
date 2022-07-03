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
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BookEventModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventData, setEventData] = useState<MyEvent | undefined>();
  const { user } = useAuth();

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
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>{data.title}</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>
          {eventData?.title}
          {eventData?.location}
          {eventData?.startTime}
          {eventData?.endTime}
          {eventData?.participationLimit}
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
