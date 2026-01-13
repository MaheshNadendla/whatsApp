import { axiosInstance } from "../lib/axios";
import axios from "axios";

const BASE_URL=process.env.REACT_APP_STATE==="localhost" ? process.env.REACT_APP_LOCAL_API_BASE_URL : process.env.REACT_APP_GLOBAL_API_BASE_URL;

export const authenticateWithGoogle = async (token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/google`,
      { token },
      { withCredentials: true }
    );

    // console.log(response, token);
    return response;
  } catch (error) {
    throw new Error("Error authenticating with Google: " + error.message);
  }
};

// Function to refresh user data from backend
export const refreshUserData = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/google`, {
      token
    });
    return response;
  } catch (error) {
    throw new Error("Error refreshing user data: " + error.message);
  }
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/check");
    return response.data;
  } catch (error) {
    throw error;
  }
};
