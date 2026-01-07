import axios from "axios";

let state = ""; // deployment

let BASE_URL = "http://localhost:5000";

if (state === "deployment") {
  BASE_URL = "https://chatapp-backend-pp2d.onrender.com";
}

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
