import { Accordion, AccordionButton, AccordionItem, Text, AccordionPanel, Flex, Heading, Spinner, AccordionIcon, Box, Stack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api/sessions';
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
    user ? getEvents(user.email).then((data) => {
      setEvents(data);
    }) : navigate("/login")
  }, []);

  useEffect(() => {
    if (!events) return;

    const todayDate = new Date();

    setToday(events.filter((event) => todayDate.getDate() === new Date(event.startTime).getDate()))
    setTomorrow(events.filter((event) => todayDate.getDate() === new Date(event.startTime).getDate() + 1))
    setUpcoming(events.filter((event) => todayDate.getDate() > new Date(event.startTime).getDate() + 1))
  }, [events]);

  function EventBox({ title, startTime }: Partial<MyEvent>) {

    return (
      <Box border="1px solid black" borderRadius={5} p={2} >
        <Heading size="xs">{title}</Heading>
        <Text>{startTime}</Text>
      </Box>
    );
  }

  return (
    <>
      {
        events ? (
          <Flex flexDir="column" p={10}>
            <Heading mb={2}>My Bookings</Heading>
            <Accordion allowToggle>
              <AccordionItem>
                <h1>
                  <AccordionButton>
                    <Heading size="sm">Today</Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </h1>
                <AccordionPanel pb={4}>
                  {today ? (
                    <VStack spacing={4} align="stretch">
                      {today?.map((e) => <EventBox startTime={e.startTime} title={e.title} />)}
                    </VStack>
                  ) : (<Text>No events :(</Text>)
                  }
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Flex textAlign='left'>
                      Tomorrow
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {
                    tomorrow ? (tomorrow.map((e) => <EventBox title="hello" />)) : (<Text>No events</Text>)
                  }
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Flex textAlign='left'>
                      Upcoming
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {
                    upcoming ? (upcoming.map((e) => <EventBox title="hello" />)) : (<Text>No events</Text>)
                  }
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        ) : (
          <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
            <Spinner />
          </Flex>
        )
      }
    </>
  );
}

export default MyBookingsPage;
