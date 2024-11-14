import axios from "axios";

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_MYKU_API_URL;
};

export const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
});
