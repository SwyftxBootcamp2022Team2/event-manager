import React, { useEffect, useState } from 'react';
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

  return <EventStats eventCount={eventsData.length} rsvpCount={rsvpCount} />;
}

export default ReportingPage;
