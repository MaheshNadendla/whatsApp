
// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // Allow frontend
//     methods: ["GET", "POST"]
//   }
// });

// let onlineUsers = {}; // Track online users

// let socketIds = [];
// let messages = [];

// Array.prototype.remove = function(value) {
//   let index = this.indexOf(value);
//   if (index !== -1) {
//       this.splice(index, 1);
//   }
// };



// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);


//   socket.emit("new_user",socket.id)

//   socket.on("get_user_id", () => {
//     socket.emit("new_user", socket.id);
//   });

//   socketIds.push(socket.id);

//   console.log(socketIds);

//   socket.on("receive_users", () => {
//     io.emit("allUsers", socketIds);
//   });

//   // Handle user joining with a username
//   // Handle user joining
//   socket.on("join", (username) => {
//     onlineUsers[socket.id] = username;
//     console.log("User joined:", username); // Debugging log
//     console.log("Online users:", onlineUsers); // Debugging log
//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });

//   // Handle public messages
//   socket.on("sendMessage", (data) => {
//     io.emit("receiveMessage", data); // Broadcast message to all clients
//   });

//   // Handle private messages (Direct Messages - DM)
//   socket.on("sendPrivateMessage", ({ chatName, inputValue }) => {

//     console.log(`${chatName} ::: ${inputValue}`)

//     io.to(chatName).emit("receivePrivateMessage", [socket.id,
//       inputValue,chatName
//     ]);
//   });

  


//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     delete onlineUsers[socket.id];

//     socketIds.remove(socket.id);

//     io.emit("allUsers", socketIds);

//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });
// });

// server.listen(5000, () => console.log("Server running on port 5000"));







// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const connectDB = require("./config/DbConnect.js");
// const authRoute = require("./routes/user.route.js");
// const { authenticateSocket } = require("./middlewares/user.middleware.js");

// const app = express();
// const server = http.createServer(app);

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// connectDB(); // connect to MongoDB

// app.use("/", authRoute); // routes for login/register/etc.

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   }
// });

// let onlineUsers = {};     
// let usersMap = {};        
// let socketIds = [];       

// // Helper to remove socket id
// Array.prototype.remove = function (value) {
//   let index = this.indexOf(value);
//   if (index !== -1) {
//     this.splice(index, 1);
//   }
// };

// io.use(authenticateSocket); 

// io.on("connection", (socket) => {
//   const userId = socket.userId;
//   const socketId = socket.id;

//   console.log(`✅ User ${userId} connected: ${socketId}`);

//   const oldSocketId = usersMap[userId];
//   if (oldSocketId && oldSocketId !== socketId) {
//     const oldSocket = io.sockets.sockets.get(oldSocketId);
//     if (oldSocket) {
//       oldSocket.emit("force_disconnect");
//       oldSocket.disconnect(true);
//     }
//   }

//   usersMap[userId] = socketId;
//   if (!socketIds.includes(socketId)) socketIds.push(socketId);

//   socket.emit("new_user", { sid: socketId, uid: userId });


//   socket.on("get_user_id", () => {
//     socket.emit("new_user", { sid: socketId, uid: userId });
//   });

//   socket.on("receive_users", () => {
//     io.emit("allUsers", socketIds);
//   });

//   socket.on("sendMessage", (data) => {
//     io.emit("receiveMessage", data);
//   });


//     socket.on("sendPrivateMessage", ({ senderId, message, receiverId }) => {
//     ; // make sure usersMap is mapping userId -> socketId

//     console.log(receiverId,message,senderId)
  
//     if (receiverId) {
//       io.to(receiverId).emit("receivePrivateMessage", {
//         senderId: senderId, // from JWT
//         message: message,
//         receiverId: receiverId,
//       });
//     }
//   });

  

 
//   socket.on("disconnect", () => {
//     console.log(`❌ User ${userId} disconnected: ${socket.id}`);
//     delete onlineUsers[socket.id];
//     socketIds.remove(socket.id);
//     if (usersMap[userId] === socket.id) delete usersMap[userId];
//     io.emit("allUsers", socketIds);
//     io.emit("onlineUsers", Object.values(onlineUsers));
//   });
// });

// server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));




import express from 'express'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { server,app } from './config/socket.io.js';


dotenv.config();

const PORT = process.env.PORT;

const corsOptions = {
  origin: [ 'http://localhost:3000',  'https://chatapp-frontend-5ql0.onrender.com'],
  credentials: true,  
};

app.use(express.json({ limit: '10mb' })); // increase the limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users", userRoutes);

server.listen(PORT,()=>{
  console.log(`server is running on port : ${PORT}`);
  connectDB();
})




