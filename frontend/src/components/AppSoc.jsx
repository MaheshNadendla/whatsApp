import React, {  useState, useEffect } from "react";
import socket from "../socket";

function AppSoc (){




 const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  console.log(onlineUsers);

    useEffect(() => {
    // Receive messages
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Receive private messages
    socket.on("receivePrivateMessage", ({ sender, message }) => {
      alert(`Private message from ${sender}: ${message}`);
    });

    // Receive typing indicator
    socket.on("userTyping", (user) => {
      setTypingUser(`${user} is typing...`);
      setTimeout(() => setTypingUser(""), 2000);
    });

    // Get online users
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("receivePrivateMessage");
      socket.off("userTyping");
      socket.off("onlineUsers");
    };
  }, []);

  const joinChat = () => {
    if (!username) return alert("Enter a username!");
    socket.emit("join", username);
  };
  

  const sendMessage = () => {
    socket.emit("sendMessage", `${username}: ${message}`);
    setMessage("");
  };

  const joinRoom = () => {
    socket.emit("joinRoom", room);
  };

  const sendMessageToRoom = () => {
    socket.emit("sendMessageToRoom", { room, message });
    setMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", room);
  };


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Real-Time Chat App (Socket.io)</h2>

      {/* Username Input */}
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={joinChat}>Join</button>

      {/* Online Users List */}
      <h3>Online Users:</h3>
      <ul>{onlineUsers.map((user, index) => <li key={index}>{user}</li>)}</ul>

      {/* Chat Messages */}
      <h3>Chat</h3>
      <div style={{ minHeight: "150px", border: "1px solid black", padding: "10px" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
        <p style={{ color: "red" }}>{typingUser}</p>
      </div>

      {/* Send Messages */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleTyping}
      />
      <button onClick={sendMessage}>Send</button>

      {/* Room Functionality */}
      <h3>Join a Room</h3>
      <input
        type="text"
        placeholder="Enter room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMessageToRoom}>Send to Room</button>
    </div>
  )
}

export default AppSoc;
