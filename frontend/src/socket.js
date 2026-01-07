
import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const socket = io(BASE_URL, {
  withCredentials: true, // ✅ send cookies with request
});

export default socket;
