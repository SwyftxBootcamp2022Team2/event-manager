/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { User, MyEvent } from '../types/types'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function login(email: string): Promise<User> {
  const res = await axios.post(`${API_ENDPOINT}/login`, {
    email,
  });

  return res.data;
}

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
            email: "user@gmail.com",
            title: "Pancakes!",
            location: "ur mum",
            startTime: "2022-07-01T10:09:50Z",
            endTime: "2022-07-03T18:09:50Z",
            participationLimit: 10,
            publishTime: "2022-07-01T18:00:50Z"
          },
          {
            eventID: 2,
            email: "user@gmail.com",
            title: "Massage",
            location: "ur mum",
            startTime: "2022-07-02T10:09:50Z",
            endTime: "2022-07-03T18:09:50Z",
            participationLimit: 10,
            publishTime: "2022-07-01T18:00:50Z"
          },
          {
            eventID: 3,
            email: "user@gmail.com",
            title: "Tiedye!",
            location: "ur mum",
            startTime: "2022-07-03T10:09:50Z",
            endTime: "2022-07-03T18:09:50Z",
            participationLimit: 10,
            publishTime: "2022-07-01T18:00:50Z"
          },
        ];

        resolve(data);
      }, 1000);
    });
  }

  const res: MyEvent[] = await delayedGet();
  return res;
}
