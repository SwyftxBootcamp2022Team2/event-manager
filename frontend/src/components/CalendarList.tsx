import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import listPlugin from '@fullcalendar/list'; // plugin
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { EventEntity } from '../types/types';

interface Event {
  title: string;
  date: string;
}

interface CalendarListProps {
  bookings: EventEntity[];
  fullCalendar?: boolean;
}

function CalendarList(props: CalendarListProps) {
  const { bookings, fullCalendar } = props;

  const eventsData: Event[] = [];

  bookings.map((booking) =>
    eventsData.push({ title: booking.title, date: booking.startTime }),
  );

  return (
    <FullCalendar
      plugins={[fullCalendar ? dayGridPlugin : listPlugin]}
      initialView={fullCalendar ? 'dayGridMonth' : 'listWeek'}
      events={eventsData}
      weekends={false}
      eventTimeFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
      }}
    />
  );
}

export default CalendarList;
