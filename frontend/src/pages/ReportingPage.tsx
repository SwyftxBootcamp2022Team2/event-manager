import React, { useEffect, useState } from 'react';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import Events from '../api/EventsEntity';
import Bookings from '../api/BookingsEntity';
import EventStats from '../components/EventStats';
import useAuth from '../useAuth';

function ReportingPage() {
  const { user } = useAuth();
  const [eventsData, setEventsData] = useState([]);
  const [rsvpCount, setRSVPCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch Data
      Events.getEvents(user.email).then((data) => setEventsData(data));
      Bookings.getRSVPCount().then((data) => setRSVPCount(data));
    }
  }, [user]);

  const reportingOptions = [
    { title: 'Export events as CSV' },
    { title: 'Export bookings' },
  ];

  return (
    <div style={{ marginLeft: 75 }}>
      <Heading size="2xl" paddingBottom="15px" paddingTop="40px">
        Reporting
      </Heading>
      <EventStats eventCount={eventsData.length} rsvpCount={rsvpCount} />
      <Box borderRadius={5} p={4} mt={5} w="70%" bg="#FFFEFE">
        {reportingOptions.map((option) => (
          <Box key={option.title}>
            <Text fontSize="3xl" paddingBottom={2}>
              <Link href="http://localhost:3000/reporting">{option.title}</Link>
            </Text>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default ReportingPage;
