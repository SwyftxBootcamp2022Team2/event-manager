import { Box, Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/sessions';
import { MyEvent } from '../types/types';
import useAuth from '../useAuth';

function MyBookingsPage() {
  const [events, setEvents] = useState<MyEvent[] | undefined>();
  const [today, setToday] = useState<MyEvent[] | undefined>();
  const [tomorrow, setTomorrow] = useState<MyEvent[] | undefined>();
  const [upcoming, setUpcoming] = useState<MyEvent[] | undefined>();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user
      ? getEvents(user.email).then((data) => {
          setEvents(data);
        })
      : navigate('/login');
  }, []);

  useEffect(() => {
    if (!events) return;

    const todayDate = new Date();
    events.map((event) => {
      const eventDate = new Date(event.startTime);

      if (eventDate.getDate() === todayDate.getDate())
        setToday([...(today || []), event]);
      else if (eventDate.getDate() === todayDate.getDate() + 1)
        setTomorrow([...(tomorrow || []), event]);
      else setUpcoming([...(upcoming || []), event]);
    });
  }, [events]);

  return (
    <>
      {events ? (
        <Box></Box>
      ) : (
        <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </>
  );
}

export default MyBookingsPage;
