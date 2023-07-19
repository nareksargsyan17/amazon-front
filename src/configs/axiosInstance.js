import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
  }
});