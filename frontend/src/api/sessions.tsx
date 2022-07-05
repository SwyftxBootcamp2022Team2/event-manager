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
  const res = await axios.get(`${API_ENDPOINT}/bookings/mybookings`, {
    params: {
      email,
    }
  });

  return res.data;
}
