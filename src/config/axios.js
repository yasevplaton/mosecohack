import axios from "axios";
const API_URL = "https://mosecohak.gman.me";

const axiosInstance = axios.create({
  baseURL: API_URL,
  mode: "cors",
});

axiosInstance.interceptors.response.use((response) => {
  if ("data" in response) {
    return response.data;
  }
  return response;
});

export default axiosInstance;
