import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { EventEntity } from '../types/types';
import useAuth from '../useAuth';
import Events from '../api/EventsEntity';
import CalendarList from '../components/CalendarList';
import { getEvents } from '../api/sessions';

function BookEventsPage() {
  const [eventsData, setEvents] = useState<EventEntity[] | undefined>();
  const [myBookings, setMyBookings] = useState<EventEntity[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      Events.getEvents(user.email).then((data) => setEvents(data));
      getEvents(user.email).then((data) => setMyBookings(data)); // gets users bookings
    }
  }, []);

  return (
    <>
      <Flex
        flexDirection="row"
        mx={10}
        justifyContent="space-between"
        height="90vh"
      >
        <Box w="70%" mr={10}>
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
                <Button
                  leftIcon={<InfoOutlineIcon />}
                  onClick={() => navigate(`/book-events/${e.eventID}`)}
                >
                  View more
                </Button>
              </Flex>
            ))}
          </Box>
        </Box>
        <Spacer />
        <Box w="30%">
          <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
            Your bookings
          </Heading>
          <CalendarList bookings={myBookings} />
        </Box>
      </Flex>
      <Outlet />
    </>
  );
}

export default BookEventsPage;
