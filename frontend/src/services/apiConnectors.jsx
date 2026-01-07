import axios from "axios";

// Base URL setup
const derivedBaseUrl = process.env.REACT_APP_API_BASE_URL || `${window.location.origin}/api`;

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

