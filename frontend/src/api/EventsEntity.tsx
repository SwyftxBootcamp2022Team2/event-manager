import axios, { AxiosResponse } from 'axios';
import { EventEntity } from '../types/types';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/event`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const eventRequests = {
  post: (url: string, body: any) =>
    instance.post<Event>(url, body).then(responseBody),
};

const Events = {
  createEvent: async (event: EventEntity): Promise<any> => {
    eventRequests.post(`/create`, event);
  },
};

export default Events;
