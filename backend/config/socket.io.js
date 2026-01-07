// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// // used to store online users
// const userSocketMap = {}; // {userId: socketId}

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);
//   console.log("arraay : ", userSocketMap);

  

//   const userId = socket.handshake.query.userId;
//   if (userId) userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all the connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("A user disconnected", socket.id);
   
//     delete userSocketMap[userId];
//     console.log("arraay : ", userSocketMap);
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
//   });
// });

// export { io, app, server };






import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });


const io = new Server(server, {
  cors: {
    origin: [ 'http://localhost:3000',  'https://chatapp-frontend-5ql0.onrender.com'],
    methods: ["GET", "POST"],
    credentials: true, // ✅ allow cookies/auth headers
  },
});


// Used to store online users: { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);
  // console.log("array : ", userSocketMap);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));


  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];
  
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId,
        receiverId,
        message,
        createdAt: new Date().toISOString(),
      });
      // console.log(`Message sent from ${senderId} to ${receiverId}`);
    }
  });
  



  // 🔹 TYPING EVENT LISTENERS
  socket.on("typing", ({ senderId, receiverId }) => {
    console.log("send : ",senderId,"recive : ",receiverId)
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("show-typing", { senderId,receiverId });
    }
  });

  // socket.on("stopTyping", ({ senderId, receiverId }) => {
  //   const receiverSocketId = userSocketMap[receiverId];
  //   if (receiverSocketId) {
  //     io.to(receiverSocketId).emit("hide-typing", { senderId });
  //   }
  // });

  socket.on("disconnect", () => {
    // console.log("A user disconnected", socket.id);

    delete userSocketMap[userId];
    // console.log("array : ", userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };









































// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     credentials: true,
//   },
// });

// // { userId: Set of socketIds }
// const userSocketMap = {};

// export function getReceiverSocketIds(userId) {
//   return userSocketMap[userId] || new Set();
// }

// io.on("connection", (socket) => {
//   console.log("A user connected", socket.id);
//   console.log(userSocketMap);

//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     if (!userSocketMap[userId]) {
//       userSocketMap[userId] = new Set();
//     }
//     userSocketMap[userId].add(socket.id);
//   }

//   // Emit current online users
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);

//     if (userId && userSocketMap[userId]) {
//       userSocketMap[userId].delete(socket.id);

//       // Remove the user if no sockets are left
//       if (userSocketMap[userId].size === 0) {
//         delete userSocketMap[userId];
//       }
//     }

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     console.log(userSocketMap);
//   });
// });

// export { io, app, server };
