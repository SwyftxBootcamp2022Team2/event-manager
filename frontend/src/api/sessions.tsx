/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { User, MyEvent, Booking, EventBooking } from '../types/types';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function login(email: string): Promise<User> {
  const res = await axios.post(`${API_ENDPOINT}/login`, {
    email,
  });

  return res.data;
}

export async function getAllEvents(): Promise<MyEvent[]> {
  const res = await axios.get(`${API_ENDPOINT}/event/get`);
  return res.data.eventData;
}

export async function getEventBookings(
  eventID: string | undefined,
  email: string,
): Promise<EventBooking> {

  const totalBookingCount = axios.get(`${API_ENDPOINT}/event/bookings/count`, {
    params: {
      eventID,
    },
  });

  const bookingStatus = axios.get(`${API_ENDPOINT}/bookings/event`, {
    params: {
      eventID,
      email,
    },
  });

  const eventDetails = axios.get(`${API_ENDPOINT}/event/view`, {
    params: {
      eventID,
    },
  });

  return Promise.all([totalBookingCount, bookingStatus, eventDetails]).then(
    (data) => {
      const e: EventBooking = {
        count: data[0].data.count,
        status: data[1].data.booked,
        event: data[2].data
      }

      return e;
    },
  );
}

export async function getTotalBookings(
  eventID: string | undefined,
): Promise<number> {
  const res = await axios.get(`${API_ENDPOINT}/event/bookings/count`, {
    params: {
      eventID,
    },
  });
  return res.data.count;
}

export async function getBookingStatus(
  eventID: string | undefined,
  email: string,
): Promise<boolean> {
  const res = await axios
    .get(`${API_ENDPOINT}/bookings/event`, {
      params: {
        eventID,
        email,
      },
    })
    .then((data) => data.data.booked)
    .catch((error) => {
      return Promise.reject(error);
    });
  return res;
}

export async function makeBooking(
  eventID: string | undefined,
  email: string,
): Promise<Booking> {
  const res = axios
    .post(`${API_ENDPOINT}/bookings/create`, {
      eventID,
      email,
    })
    .then((data) => data.data)
    .catch((error) => {
      return Promise.reject(error);
    });
  return res;
}

export async function getEventDetails(id: string | undefined): Promise<MyEvent> {
  const res = await axios.get(`${API_ENDPOINT}/event/view`, {
    params: {
      eventID: id,
    },
  });
  return res.data;
}

export async function getEvents(email: string): Promise<MyEvent[]> {
  const res = await axios.get(`${API_ENDPOINT}/bookings/mybookings`, {
    params: {
      email,
    }
  });

  return res.data;
}
