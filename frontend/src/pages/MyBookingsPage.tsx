import React, { useEffect, useState } from 'react';
import { Accordion, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getEvents } from '../api/sessions';
import AccordionEventList from '../components/AccordionEventList';
import { EventEntity } from '../types/types';
import useAuth from '../useAuth';

function MyBookingsPage() {
  const [events, setEvents] = useState<EventEntity[]>();
  const [today, setToday] = useState<EventEntity[]>();
  const [tomorrow, setTomorrow] = useState<EventEntity[]>();
  const [upcoming, setUpcoming] = useState<EventEntity[]>();

  const { user } = useAuth();

  useEffect(() => {
    if (user) getEvents(user.email).then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    if (!events) return;

    const todayDate = new Date();

    setToday(
      events.filter(
        (event) => todayDate.getDate() === new Date(event.startTime).getDate(),
      ),
    );
    setTomorrow(
      events.filter(
        (event) =>
          todayDate.getDate() === new Date(event.startTime).getDate() + 1,
      ),
    );
    setUpcoming(
      events.filter(
        (event) =>
          todayDate.getDate() > new Date(event.startTime).getDate() + 1,
      ),
    );
  }, [events]);

  return events ? (
    <Flex flexDir="column" p={10}>
      <Heading mb={2}>My Bookings</Heading>
      <Accordion allowToggle defaultIndex={[0]}>
        <AccordionEventList title="Today" events={today} />
        <AccordionEventList title="Tomorrow" events={tomorrow} />
        <AccordionEventList title="Upcoming" events={upcoming} />
      </Accordion>
    </Flex>
  ) : (
    <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  );
}

export default MyBookingsPage;
