export interface User {
  email: string;
  fname: string;
  lname: string;
  isAdmin: boolean;
}

export interface MyEvent {
  eventID: number;
  email: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  participationLimit: number;
  publishTime: string;
}
