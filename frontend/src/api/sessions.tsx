/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { User, MyEvent, Booking } from '../types/types';

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

export async function getTotalBookings(
  eventID: string | undefined,
): Promise<number | string> {
  if (eventID) {
    const res = await axios.get(`${API_ENDPOINT}/event/bookings/count`, {
      params: {
        eventID,
      },
    });
    return res.data.count;
  }
  return 'Invalid event ID';
}

export async function makeBooking(
  eventID: string | undefined,
  email: string,
): Promise<Booking> {
    console.log(`email that I got: ${email}`)
    const res = axios.post(`${API_ENDPOINT}/bookings/create`, {
      eventID,
      email,
    }).then(data => data.data).catch((error) => {
      return Promise.reject(error);
    });
    return res;
}

export async function getEventDetails(
  id: string | undefined,
): Promise<MyEvent | string> {
  if (id) {
    const res = await axios.get(`${API_ENDPOINT}/event/view`, {
      params: {
        eventID: id,
      },
    });
    return res.data;
  }
  return 'Invalid event ID';
}

export async function getEvents(email: string): Promise<MyEvent[]> {
  const res = await axios.get(`${API_ENDPOINT}/bookings/mybookings`, {
    params: {
      email,
    }
  });

  return res.data;
}
