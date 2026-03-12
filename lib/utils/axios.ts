import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
