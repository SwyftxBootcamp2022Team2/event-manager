import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, Outlet } from 'react-router-dom';
import { MyEvent } from '../types/types';
import useAuth from '../useAuth';
import * as sessionsApi from '../api/sessions';

function BookEventsPage() {
  const [eventsData, setEvents] = useState<MyEvent[] | undefined>();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user
      ? sessionsApi.getEvents(user.email).then((data) => {
          setEvents(data);
        })
      : navigate('/login');
  }, []);

  return (
    <>
      <div style={{ marginLeft: 75 }}>
        <Heading size="2xl" paddingBottom="25px" paddingTop="40px">
          Our Events
        </Heading>
        <Box pl={5} borderRadius={5} w="70%" bg="#FFFEFE">
          {eventsData?.map((e) => (
            <Box p={4}>
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
