import React, { useEffect, useState } from 'react';
import Events from '../api/EventsEntity';
import EventStats from '../components/EventStats';
import useAuth from '../useAuth';

function ReportingPage() {
  const { user } = useAuth();
  const [eventsData, setEvents] = useState([]);

  useEffect(() => {
    if (user) Events.getEvents(user.email).then((data) => setEvents(data));
  }, [user]);

  return <EventStats eventCount={eventsData.length ?? 0} rsvpCount={10} />;
}

export default ReportingPage;
