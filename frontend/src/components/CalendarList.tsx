import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import listPlugin from '@fullcalendar/list'; // plugin
import { EventEntity } from '../types/types';

interface Event {
  title: string;
  date: string;
}

interface CalendarListProps {
  bookings: EventEntity[];
}

function CalendarList(props: CalendarListProps) {
  const { bookings } = props;

  const eventsData: Event[] = [];

  bookings.map((booking) =>
    eventsData.push({ title: booking.title, date: booking.startTime }),
  );

  return (
    <FullCalendar
      plugins={[listPlugin]}
      initialView="listWeek"
      weekends={false}
      events={eventsData}
      eventClick={() => console.log('open the modal here')}
    />
  );
}

export default CalendarList;
