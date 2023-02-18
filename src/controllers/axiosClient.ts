/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import queryString from 'query-string';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEVELOPE_URL
    : process.env.NEXT_PUBLIC_PRODUCT_URL;

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 5000,
  // paramsSerializer chuan hóa các params về string để trên server có thể tách ra được
  // ví dụ nào không chuẩn hóa thì truyển mảng params trên server sẽ ko tách mảng ra được
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});
