import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { EventEntity, ToastStatus } from '../types/types';
import useAuth from '../useAuth';
import Events from '../api/EventsEntity';
import { DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import Admin from '../components/permissions/Admin';

function BookEventsPage() {
  const [eventsData, setEvents] = useState<EventEntity[] | undefined>();

  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Events.getEvents(user.email).then((data) => setEvents(data));
    }
  }, []);

  const showToast = (title: string, status: ToastStatus) =>
  toast({
    title,
    status,
    isClosable: true,
    position: 'top-right',
  });

  const deleteEvent = (eventID: number | undefined) => {
    if (user && eventID) {
      Events.deleteEvent(user.email, eventID).then((data) => {
        showToast(data, 'success');
        Events.getEvents(user.email).then((eventData) => setEvents(eventData));
      }).catch((error) => showToast(error.response.data, 'error'));
    }
  }

  return (
    <>
      <Box mx={20}>
        <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
          Our Events
        </Heading>
        <Box borderRadius={5}>
          {eventsData?.map((e) => (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              p={4}
              key={e.eventID}
              mb={3}
              bg="#FFFEFE"
              borderRadius={6}
            >
              <Text fontSize="3xl" paddingBottom={2}>
                {e.title}
              </Text>
              <Stack spacing={4} direction="row" align="center">
                <Admin>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    variant="solid"
                    onClick={() => deleteEvent(e.eventID)}
                  >
                    Delete
                  </Button>
                </Admin>
                <Button
                  leftIcon={<InfoOutlineIcon />}
                  onClick={() => navigate(`/book-events/${e.eventID}`)}
                >
                  View more
                </Button>
              </Stack>
            </Flex>
          ))}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default BookEventsPage;
