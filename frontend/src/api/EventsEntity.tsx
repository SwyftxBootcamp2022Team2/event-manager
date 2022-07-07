import axios, { AxiosResponse } from 'axios';
import { EventEntity } from '../types/types';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/event`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const eventRequests = {
  post: (url: string, body: any) =>
    instance.post<EventEntity>(url, body).then(responseBody),
  get: (url: string, body: any) =>
    instance.get<Promise<EventEntity[]>>(url, body).then(responseBody),
  delete: (url: string, body: any) =>
    instance
      .delete<Promise<string>>(url, body)
      .then(responseBody)
      .catch((error) => Promise.reject(error)),
};

const Events = {
  createEvent: async (event: EventEntity): Promise<any> =>
    eventRequests.post(`/create`, event),
  getEvents: async (email: string): Promise<any> =>
    eventRequests.get('/get', email),
  deleteEvent: async (
    email: string | undefined,
    eventID: number | undefined,
  ): Promise<any> =>
    eventRequests.delete('/delete', {
      params: {
        eventID,
        email,
      },
    }),
};

export default Events;
