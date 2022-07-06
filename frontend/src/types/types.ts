export interface User {
  email: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
}

export interface EventEntity {
  description: string;
  bookingID: number;
  eventID: number;
  email: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  participationLimit: number;
  publishTime: string;
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
