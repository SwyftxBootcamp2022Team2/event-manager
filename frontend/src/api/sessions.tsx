import axios from "axios";
import React from "react";
import { User } from "../types/user";

export async function login(email: string): Promise<User> {
  const res = await axios.post("http://127.0.0.1:5000/login", {
    email
  });

  return res.data;
}
