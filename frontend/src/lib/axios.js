import axios from "axios";

const BASE_URL=process.env.REACT_APP_STATE=="localhost" ? process.env.REACT_APP_LOCAL_API_BASE_URL : process.env.REACT_APP_GLOBAL_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

// 🔑 ATTACH TOKEN HERE (IMPORTANT)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
