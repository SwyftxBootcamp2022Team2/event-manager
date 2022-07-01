import React from 'react';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet } from 'react-router-dom';

type Event = { id: Number; title: string };

const eventsData: Event[] = [
  { title: 'Pancake Tuesday', id: 1 },
  { title: 'Rock Climbing', id: 2 },
  { title: 'Beats and Beers', id: 3 },
  { title: 'Massages', id: 4 },
];

function BookEventsPage() {
  return (
    <>
      <div style={{ marginLeft: 75 }}>
        <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
          Our Events
        </Heading>
        <Box pl={5} borderRadius={5} w="70%" bg="#FFFEFE">
          {eventsData.map((e) => (
            <Box p={4}>
              <Text fontSize="3xl" paddingBottom={2}>
                <Link as={ReactRouterLink} to={`/book-events/${e.id}`}>
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
