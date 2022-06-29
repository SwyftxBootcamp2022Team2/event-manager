import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

interface Event {
  title: string;
  date: string;
  location: string;
}

function CalendarPage() {
  const eventsData: Event[] = [
    { title: 'event 1', date: '2022-06-14', location: 'Bitcoin Booardroom' },
    { title: 'event 2', date: '2022-06-14', location: 'Bitcoin Booardroom' },
    { title: 'event 3', date: '2022-06-16', location: 'Bitcoin Booardroom' },
    { title: 'event 4', date: '2022-06-23', location: 'Bitcoin Booardroom' },
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={eventsData}
      eventClick={() => console.log('open the modal here')}
    />
  );
}

export default CalendarPage;
