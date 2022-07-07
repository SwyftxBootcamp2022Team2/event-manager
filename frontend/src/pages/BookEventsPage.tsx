import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, Outlet, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { EventEntity } from '../types/types';
import useAuth from '../useAuth';
import { getAllEvents } from '../api/sessions';
import { InfoOutlineIcon } from '@chakra-ui/icons';

function BookEventsPage() {
  const [eventsData, setEvents] = useState<EventEntity[] | undefined>();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getAllEvents().then((data) => setEvents(data));
    }
  }, []);

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
              <Button leftIcon={<InfoOutlineIcon />} onClick={() => navigate(`/book-events/${e.eventID}`)}>View more</Button>
            </Flex>
          ))}
        </Box>
      </Box>
      <Outlet />
    </>
  );
}

export default BookEventsPage;
