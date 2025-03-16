import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5174/api',
    timeout: 1000,
  });