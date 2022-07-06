import React, { useEffect, useState } from 'react';
import { Accordion, Flex, Heading, Spinner } from '@chakra-ui/react';
import { getEvents } from '../api/sessions';
import AccordionEventList from '../components/AccordionEventList';
import { EventEntity, DayType } from '../types/types';
import useAuth from '../useAuth';

export default function MyBookingsPage() {
  const [events, setEvents] = useState<EventEntity[]>();
  const [today, setToday] = useState<EventEntity[]>();
  const [tomorrow, setTomorrow] = useState<EventEntity[]>();
  const [upcoming, setUpcoming] = useState<EventEntity[]>();

  const { user } = useAuth();

  const checkDate = (d: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d > tomorrow) return DayType.upcoming;
    else if (d < today) return DayType.past;
    else if (d.getFullYear() == tomorrow.getFullYear() &&
      d.getMonth() == tomorrow.getMonth() &&
      d.getDate() == tomorrow.getDate())
      return DayType.tomorrow;

    return DayType.today;
  }

  useEffect(() => {
    if (user) getEvents(user.email).then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    if (!events) return;

    setToday(
      events.filter(
        (event) => checkDate(new Date(event.startTime)) == DayType.today)
    );
    setTomorrow(
      events.filter(
        (event) => checkDate(new Date(event.startTime)) == DayType.tomorrow)
    );
    setUpcoming(
      events.filter(
        (event) => checkDate(new Date(event.startTime)) == DayType.upcoming)
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
