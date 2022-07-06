import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, Outlet } from 'react-router-dom';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { EventEntity } from '../types/types';
import useAuth from '../useAuth';
import Events from '../api/EventsEntity';

function BookEventsPage() {
  const [eventsData, setEvents] = useState<EventEntity[] | undefined>();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      Events.getEvents(user.email).then((data) => setEvents(data));
    }
  }, []);

  return (
    <>
      <div style={{ marginLeft: 75 }}>
        <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
          Our Events
        </Heading>
        <Box pl={5} borderRadius={5} w="70%" bg="#FFFEFE">
          {eventsData?.map((e) => (
            <Box p={4} key={e.eventID}>
              <Text fontSize="3xl" paddingBottom={2}>
                <Link as={ReactRouterLink} to={`/book-events/${e.eventID}`}>
                  {e.title}
                </Link>
              </Text>
            </Box>
          ))}
        </Box>
      </div>
      <Outlet />
    </>
  );
}

export default BookEventsPage;
