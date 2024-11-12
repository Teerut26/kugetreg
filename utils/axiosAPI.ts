import axios from "axios";

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API;
};

export const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
});
