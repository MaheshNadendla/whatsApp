import axios from "axios";

const BASE_URL=process.env.REACT_APP_STATE=="localhost" ? process.env.REACT_APP_LOCAL_API_BASE_URL : process.env.REACT_APP_GLOBAL_API_BASE_URL;

// Base URL setup
const derivedBaseUrl = `${BASE_URL}/api` || `${window.location.origin}/api`;

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: derivedBaseUrl,
});

// Interceptor to attach token safely
axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
  
    token = token.replace(/^"|"$/g, "");

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Reusable API connector
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers || {},
    params: params || {},
  });
};

