import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/sessions';
import { Accordion, Flex, Heading, Spinner } from '@chakra-ui/react';
import AccordionEventList from '../components/AccordionEventList';
import { MyEvent } from '../types/types';
import useAuth from '../useAuth';

function MyBookingsPage() {
  const [events, setEvents] = useState<MyEvent[]>();
  const [today, setToday] = useState<MyEvent[]>();
  const [tomorrow, setTomorrow] = useState<MyEvent[]>();
  const [upcoming, setUpcoming] = useState<MyEvent[]>();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      getEvents(user.email).then((data) => setEvents(data))
    else navigate("/login");
  }, []);

  useEffect(() => {
    if (!events) return;

    const todayDate = new Date();

    setToday(events.filter((event) => todayDate.getDate() === new Date(event.startTime).getDate()))
    setTomorrow(events.filter((event) => todayDate.getDate() === new Date(event.startTime).getDate() + 1))
    setUpcoming(events.filter((event) => todayDate.getDate() > new Date(event.startTime).getDate() + 1))
  }, [events]);

  return (
    events ? (
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
    )
  );
}

export default MyBookingsPage;
