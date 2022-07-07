import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getEvents } from '../api/sessions';
import { EventEntity } from '../types/types';
import useAuth from '../useAuth';
import CalendarList from '../components/CalendarList';

export default function MyBookingsPage() {
  const [myBookings, setMyBookings] = useState<EventEntity[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    // get users bookings
    if (user) getEvents(user.email).then((data) => setMyBookings(data));
  }, []);

  return myBookings ? (
    <Box px={75}>
      <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
        My Bookings
      </Heading>
      <Box p={5} borderRadius={5} w="100%" bg="#FFFEFE">
        <CalendarList bookings={myBookings} fullCalendar />
      </Box>
    </Box>
  ) : (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}
