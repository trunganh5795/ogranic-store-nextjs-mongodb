import axios from 'axios';
const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPE_URL
    : process.env.NEXT_PUBLIC_PRODUCT_URL;

export const axiosClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 1000,
});
