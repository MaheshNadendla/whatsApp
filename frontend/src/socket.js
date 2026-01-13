
import { io } from "socket.io-client";

const BASE_URL=process.env.REACT_APP_STATE=="localhost" ? process.env.REACT_APP_LOCAL_API_BASE_URL : process.env.REACT_APP_GLOBAL_API_BASE_URL;


const socket = io(BASE_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
});


export default socket;
