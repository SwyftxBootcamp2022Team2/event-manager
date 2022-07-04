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
): Promise<Booking | string> {
  // check if email and eventID aren't undefined
  if (eventID && email) {
    const res = await axios.get(`${API_ENDPOINT}/event/view`, {
      params: {
        eventID,
        email,
      },
    });
    return res.data;
  }
  return 'Invalid eventID and/or user';
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

// export async function bookEvent(
//   eventID: string | undefined,
//   email: string
// ): Promise<string> {
//   if (eventID && email) {
//     const res = await axios.get(`${API_ENDPOINT}/bookings/create`, {
//       params: {
//         eventID: id,
//       },
//     });
//     return res.data;
//   }
//   return undefined; // TODO: change
// }

export async function getEvents(email: string): Promise<MyEvent[]> {
  // const res = await axios.get(`${API_ENDPOINT}/bookings/mybookings`, {
  //   params: {
  //     email,
  //   }
  // });

  function delayedGet(): Promise<MyEvent[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data: MyEvent[] = [
          {
            eventID: 1,
            email: 'user@gmail.com',
            title: 'Pancakes!',
            description:
              'this is a test description. blah blah blah. more things to say.',
            location: 'ur mum',
            startTime: '2022-07-01T10:09:50Z',
            endTime: '2022-07-03T18:09:50Z',
            participationLimit: 10,
            publishTime: '2022-07-01T18:00:50Z',
          },
          {
            eventID: 2,
            email: 'user@gmail.com',
            title: 'Massage',
            description:
              'this is a test description. blah blah blah. more things to say.',
            location: 'ur mum',
            startTime: '2022-07-02T10:09:50Z',
            endTime: '2022-07-03T18:09:50Z',
            participationLimit: 10,
            publishTime: '2022-07-01T18:00:50Z',
          },
          {
            eventID: 3,
            email: 'user@gmail.com',
            title: 'Tiedye!',
            description:
              'this is a test description. blah blah blah. more things to say.',
            location: 'ur mum',
            startTime: '2022-07-03T10:09:50Z',
            endTime: '2022-07-03T18:09:50Z',
            participationLimit: 10,
            publishTime: '2022-07-01T18:00:50Z',
          },
        ];

        resolve(data);
      }, 1000);
    });
  }

  const res: MyEvent[] = await delayedGet();
  return res;
}
