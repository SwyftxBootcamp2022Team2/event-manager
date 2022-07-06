export interface User {
  email: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
}

export interface EventEntity {
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  participationLimit: number;
  bookingID?: number;
  eventID?: number;
  email?: string;
  publishTime?: string;
}

export interface Booking {
  bookingID: number;
  email: string;
  eventID: number;
}

export interface EventBooking {
  count: number;
  status: boolean;
  event: EventEntity;
}

export type ToastStatus = "success" | "loading" | "error";

