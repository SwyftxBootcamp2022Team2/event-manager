import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/bookings`,
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const eventRequests = {
  get: (url: string, body: any) =>
    instance.get<Promise<Number>>(url, body).then(responseBody),
};

const Bookings = {
  getRSVPCount: async (eventID?: any): Promise<any> =>
    eventRequests.get('/count', { params: { eventID } }),
};

export default Bookings;
