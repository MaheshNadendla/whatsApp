// import React, { useState, useEffect } from "react";
// import socket from "./socket";

// const App = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("send_message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Socket.io Chat</h2>
//       <div style={{ minHeight: "200px", border: "1px solid black", padding: "10px" }}>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p>
//         ))}
//       </div>
//       <input 
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default App;

// import socket from "./socket";
import React, { useContext, useEffect } from "react";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./components/HomePage/MiddleComponents/Settings";
import { Toaster } from 'react-hot-toast';
import { ContextDef } from "./components/HomePage/contextDef";
import Spinner from "./components/utils/Loader";
import OtpVerificationPage from "./pages/verifyOtpPage";
import GlobalLoginHandler from "./components/GlobalLoginHandler";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,screen, setScreen} = useContext(ContextDef);
  

  // Detect screen size
    const handleResize = () => {
       
      const width = window.innerWidth;
      if (width < 768) {
        setScreen("mobile");
        console.log("screen : mobile");
      }
      else if (width >= 768 && width < 1024){
         setScreen("tablet");
         console.log("screen : tablet");
      }
      else{
        setScreen("desktop");
        console.log("screen : destop");
      }

      
    };

  // useEffect(() => {
  //   checkAuth();  // Call checkAuth to validate user on mount
  //   console.log("hello");
  // }, [checkAuth]);

  //   useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkAuth();
  //      console.log("hello");
  //   }, 3000); // call every 3000ms

  //   return () => clearInterval(interval); // cleanup on unmount
  // }, [checkAuth]);


useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    checkAuth(); // backend validates
  }
}, []);


console.log("brooooooooooooooooooooooooo check",isCheckingAuth)
  
    useEffect(() => {
      handleResize(); // initial check
     
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <Spinner/>
    );
  }
  

  return (
    <>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>

      <BrowserRouter>
         
           <GlobalLoginHandler/>
        <Routes>
          {/* Redirect to signup if user is not logged in */}
          <Route path="/" element={authUser   ? ( authUser?.isVerified ? (<Navigate to="/home" />) : <Navigate to="/verify" />)  : <Navigate to="/signup" />} />
          <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <SignupPage />} />
          <Route path="/home" element={authUser ? ( authUser?.isVerified ? (<HomePage />) : <Navigate to="/verify" />)  : <Navigate to="/signup" />} />
          <Route path="/profile" element={authUser ?  ( authUser?.isVerified ? (<ProfilePage />) : <Navigate to="/verify" />)    : <Navigate to="/signup" />} />
          <Route path="/settings" element={authUser ? ( authUser?.isVerified ? (<Settings />) : <Navigate to="/verify" />)  : <Navigate to="/signup" />} />
          <Route path="/verify" element={authUser ? ( authUser?.isVerified ? (<Navigate to="/home" />) : <OtpVerificationPage />)  : <Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
