// import { createContext, useContext, useState } from "react";
// import { axiosInstance } from "../../lib/axios";

// import toast from "react-hot-toast";
// import { io } from "socket.io-client";





// const BASE_URL = "http://localhost:5000";

// export const ContextDef = createContext();

// const ContextProvider = (props) => {

 

//   const [authUser, setAuthUser] = useState(null);
//   const [isSigningUp, setIsSigningUp] = useState(false);
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
//   const [isCheckingAuth, setIsCheckingAuth] = useState(true);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [socket, setSocket] = useState(null);

//   const [middlePage, setMiddlePage] = useState("chats");
//   const [chatName, setChatName] = useState(null);
//   const [yourName, setYourName] = useState(null);
//   const [messages, setMessages] = useState([{ senderId: null, message: null, receiverId: null }]);
//   const [userMessages, setUserMessages] = useState([{ senderId: null, message: null, receiverId: null }]);


//   const checkAuth = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/check");
//       setAuthUser(res.data);
//       console.log(res.data)
//     //   connectSocket();
//     } catch (error) {
//       console.log("Error in checkAuth:", error);
//       setAuthUser(null);
//     } finally {
//       setIsCheckingAuth(false);
//     }
//   };

//   const signup = async (data) => {
//     setIsSigningUp(true);
//     try {

//         const response = await axiosInstance.post('/auth/signup', data);
      
//         console.log(response)

//         if (response.status === 201) {
//             console.log('Sign up successful:', response.data);
//             setAuthUser(response.data);
//             toast.success(response.data.message || "Sign up successful" , {
//             duration: 3000,
//             position: 'top-center', 
//             });
//             return true;
//         }
//         else{
//             toast.error(response.data.message || 'Something went wrong', {
//                 duration: 3000,
//                 position: 'top-center', 
//             });
//             return false;
//         }
//     //   connectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       setIsSigningUp(false);
//     }
//   };

//   const login = async (data) => {
//     setIsLoggingIn(true);
//     try {

//         const response = await axiosInstance.post('/auth/login', data);
//         if (response.status === 201) {
//             console.log('Login successful:', response.data);
//             setAuthUser(response.data);
//             toast.success(response.data.message || "Login successful" , {
//             duration: 3000,
//             position: 'top-center', 
//             });
//             return true;
//         }
//         else{
//             toast.error(response.data.message || 'Something went wrong', {
//                 duration: 3000,
//                 position: 'top-center', 
//             });
//             return false;
//         }

//     //   connectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoggingIn(false);
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await axiosInstance.post("/auth/logout");
//       setAuthUser(null);
//       toast.success(response.data.message);
//       return true;
//     //   disconnectSocket();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Logout failed");
//       return false;
//     }
//   };

//   const updateProfile = async (data) => {
//     setIsUpdatingProfile(true);
//     try {
//       const res = await axiosInstance.put("/auth/update-profile", data);
//       setAuthUser(res.data);
//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log("Error in update profile:", error);
//       toast.error(error.response?.data?.message || "Profile update failed");
//     } finally {
//       setIsUpdatingProfile(false);
//     }
//   };

//   // Socket Functions
//   const connectSocket = () => {
//     if (!authUser || socket?.connected) return;

//     const newSocket = io(BASE_URL, {
//       query: { userId: authUser._id },
//     });
//     newSocket.connect();

//     setSocket(newSocket);

//     newSocket.on("getOnlineUsers", (userIds) => {
//       setOnlineUsers(userIds);
//     });
//   };

//   const disconnectSocket = () => {
//     if (socket?.connected) socket.disconnect();
//   };

//   return (
//     <ContextDef.Provider
//       value={{
//         authUser,
//         isSigningUp,
//         isLoggingIn,
//         isUpdatingProfile,
//         isCheckingAuth,
//         onlineUsers,
//         socket,
//         middlePage,
//         chatName,
//         yourName,
//         messages,
//         userMessages,
//         setMiddlePage,
//         setChatName,
//         setYourName,
//         setMessages,
//         setUserMessages,
//         checkAuth,
//         signup,
//         login,
//         logout,
//         updateProfile,
//         connectSocket,
//         disconnectSocket,
//       }}
//     >
//       {props.children}
//     </ContextDef.Provider>
//   );
// };

// export default ContextProvider;

// // optional easy way to use it
// export const useAuthContext = () => useContext(ContextDef);


import { createContext, use, useCallback, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

import { checkAuth as checkAuthService } from "../../services/authService";


import { logout as logoutAction } from "../../slices/authSlice";








import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

// import socket from "../../socket";

// const BASE_URL = "https://chatapp-backend-pp2d.onrender.com";

const BASE_URL=process.env.REACT_APP_LOCAL_API_BASE_URL;


export const ContextDef = createContext();

const ContextProvider = (props) => {
  
  
  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const [middlePage, setMiddlePage] = useState("chats");
  const [chatName, setChatName] = useState(null);
  const [yourName, setYourName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [addFriendProfile,setAddFriendProfile]=useState(null);
   const [notificationsProfile,setNotificationsProfile]=useState(null);

  // Chat Store additions
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [typingStatus, setTypingStatus] = useState(null);

  const [isVerifingOtp, setIsVerifingOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [newMessageRecived, setNewMessageRecived] = useState(null);

  const [homeRightPage, setHomeRightPage] = useState(null);
  const [homeRightPageChannel, setHomeRightPageChannel] = useState(null);

  const [AiRightPage, setAiRightPage] = useState(null);
  const [selectedUserStatus,setSelectedUserStatus]=useState(null);
  const [selectedOne,setSelectedOne] = useState(null)

  const [typers,setTypers] = useState([]);

  const [myStatusesSending,setMyStatusesSending] = useState(false)

   const [screen, setScreen] = useState("desktop"); // "mobile", "tablet", "desktop"

   const [rightPartActive ,setRightPartActive] = useState(false);


   useEffect(() => {
    console.log("selectedUser changed inside ContextProvider:", selectedUser);
  }, [selectedUser]);

  




  // console.log("selectedUser : ",selectedUser);

  // const getUsers = async () => {
  //   setIsUsersLoading(true);
  //   try {
  //     const res = await axiosInstance.get("/messages/users");
  //     setUsers(res.data);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to fetch users");
  //   } finally {
  //     setIsUsersLoading(false);
  //   }
  // };


  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setIsUsersLoading(false);
    }
  },[]);

  // const getMessages = async (userId) => {
  //   setIsMessagesLoading(true);
  //   try {
  //     const res = await axiosInstance.get(`/messages/${userId}`);
  //     setMessages(res.data);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to fetch messages");
  //   } finally {
  //     setIsMessagesLoading(false);
  //   }
  // };


  const getMessages = useCallback(async (userId) => {
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
      // console.log("hello");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      setIsMessagesLoading(false);
    }
  },[messages]);


  const sendMessage = useCallback( async (messageData) => {
    if (!selectedUser) return;
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      console.log("message sent to backend")


      // if (authUser && socket?.connected) 
      // {
      //   socket.emit("sendMessage", {
      //     senderId: authUser._id,
      //     receiverId: selectedUser._id,
      //     message: res.data,
      //   });
      // }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },[messages,selectedUser])

  //here is this above selectUser


  // const sendMessage = async (messageData) => {

  //   console.log("selectedUser : ",selectedUser,"socket : ",socket);
  //   console.log("messageData : ",messageData);
  //   console.log("message sent in sendMessage function");

  //   if (!selectedUser || !socket) return; // Ensure socket is available
  
  //   try {
  //     // Send message to backend
  //     console.log("message send to backend")
  //     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      
  //     // Add sent message to UI
  //     setMessages((prevMessages) => [...prevMessages, res.data]);
      
  //     // Emit the message to Socket.IO
  //     socket.emit("sendMessage", {
  //       senderId: authUser._id, // assuming `currentUser` holds the current user's data
  //       receiverId: selectedUser._id,
  //       message: res.data,
  //     });
  
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to send message");
  //   }
  // }

  

  // const subscribeToMessages = () => {
  //   if (!selectedUser || !socket) return;

  //   socket.on("newMessage", (newMessage) => {
  //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  //     if (!isMessageSentFromSelectedUser) return;

  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   });
  // };

  // const unsubscribeFromMessages = () => {
  //   if (socket) {
  //     socket.off("newMessage");
  //   }
  // };


  const subscribeToMessages = useCallback(() => {
    if (!selectedUser || !socket) return;

    // console.log("hello2");
    // console.log("Socket connected:", socket?.connected);
    // console.log("Subscribed to newMessage for", selectedUser?._id);



    socket.on("newMessage", (newMessage) => {


      if (newMessage.senderId === selectedUser._id) {
        // setTypers((prev) => prev.filter((typer) => typer.id !== newMessage.senderId));
        setTypingStatus(false);
      }


      
      
      console.log("New message received from socket:", newMessage);
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

      console.log("Incoming message senderId:", newMessage.senderId);
      console.log("Selected user _id:", selectedUser._id);

      if (!isMessageSentFromSelectedUser) return;
      
      setMessages((prev) => {
        console.log("Adding new message to state",newMessage);
        return [...prev, newMessage];
      });

    });
  },[selectedUser,socket]);

  const unsubscribeFromMessages = useCallback(() => {
    if (socket) {
      socket.off("newMessage");
    }
  },[socket]);



  // Auth Functions
  // const checkAuth = async () => {
  //   try {
  //     const res = await axiosInstance.get("/auth/check");
  //     setAuthUser(res.data);
  //     // console.log(res.data)
  //     connectSocket();
  //   } catch (error) {
  //     console.log("Error in checkAuth:", error);
  //     setAuthUser(null);
  //   } finally {
  //     setIsCheckingAuth(false);
  //   }
  // };

  // const checkAuth = async() => {
  //   try {
  //     const res = await checkAuth();
  //     // setAuthUser(res.data);
  //     connectSocket();  // Be careful: connectSocket shouldn't cause re-renders either
  //   } catch (error) {
  //     console.log("Error in checkAuth:", error);
  //     // setAuthUser(null);
  //   } finally {
  //     setIsCheckingAuth(false);
  //   }
  // }

  const checkAuth = async () => {
  try {
    setIsCheckingAuth(true);
    const res = await checkAuthService();

    console.log("lowde res : ",res);
    setAuthUser(res);
    console.log("authUser at check auth : ",authUser); //<= here null response has data still not printing



    connectSocket();
  } catch (error) {
    console.log("Error in checkAuth:", error);
    setAuthUser(null);
  } finally {
    setIsCheckingAuth(false);
  }
};
  

  const signup = async (data) => {
    try {
      setIsSigningUp(true);
      const response = await axiosInstance.post('/auth/signup', data);
      console.log(response)
      if (response.status === 201) {
        console.log('Sign up successful:', response.data);
        setAuthUser(response.data);
        toast.success(response.data.message || "Sign up successful", {
          duration: 3000,
          position: 'top-center',
        });
        connectSocket()
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data) => {
    setIsLoggingIn(true);
    try {
      const response = await axiosInstance.post('/auth/login', data);
      if (response.status === 201) {
        console.log('Login successful:', response.data);
        setAuthUser(response.data);
        toast.success(response.data.message || "Login successful", {
          duration: 3000,
          position: 'top-center',
        });
        connectSocket();
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const sendVerifyOtpFun = async () => {
    setIsSendingOtp(true);
    try {
      const response = await axiosInstance.post('/auth/send-verify-otp');
      if (response.status === 201) {
        console.log('Verification Otp send successful:', response.data);
        toast.success(response.data.message || "Otp send to Mail", {
          duration: 3000,
          position: 'top-center',
        });
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Otp send failed");
    } finally {
      setIsSendingOtp(false);
    }
  };


  const verifyEmail = async (data) => {
    console.log("otp : ",data);
    setIsVerifingOtp(true);
    try {
      const response = await axiosInstance.post('/auth/verify-email',{"otp":data});
      if (response.status === 201) {
        console.log('you are Verified successful:', response.data);
        toast.success(response.data.message || "You are Verified successful", {
          duration: 3000,
          position: 'top-center',
        });
        return true;
      } else {
        toast.error(response.data.message || 'Something went wrong', {
          duration: 3000,
          position: 'top-center',
        });
        return false;
      }
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Otp : failed");
    } finally {
      setIsVerifingOtp(false);
    }
  };



  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      dispatch(logoutAction());
      setAuthUser(null);
      toast.success(response.data.message);
      disconnectSocket();
     
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
     
    }
  };

  const updateProfile = async (data) => {
    setIsUpdatingProfile(true);
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      setAuthUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setIsUpdatingProfile(false);
    }
  };



    // Socket Functions
    // const connectSocket = () => {
    //   if (!authUser || socket?.connected) return;
  
    //   const newSocket = io(BASE_URL, {
    //     query: { userId: authUser._id },
    //   });
    //   newSocket.connect();
  
    //   setSocket(newSocket);
  
    //   newSocket.on("getOnlineUsers", (userIds) => {
    //     setOnlineUsers(userIds);
    //   });





    // };
  
    // const disconnectSocket = () => {
    //   if (socket?.connected) socket.disconnect();
    // };
  
    ////

    useEffect(() => {
      console.log("hello mana")
    if (!authUser) return;

    connectSocket();
    }, [authUser]);




    const connectSocket = () => {

      

      // console.log("connectSocket called");
      console.log("authUser : ",authUser);
      console.log("socket : ",socket);
      console.log("socket connected : ",socket?.connected);

      if (!authUser || socket?.connected) return;
    
      const newSocket = io(BASE_URL, {
        query: { userId: authUser._id },
        withCredentials: true, 
      });  
    
    
      newSocket.connect();
      setSocket(newSocket);
                                  
      // Listen for online users
      newSocket.on("getOnlineUsers", (userIds) => {
        setOnlineUsers(userIds);
        // setTypers((prev) => prev.filter((typer) => userIds.includes(typer.id)));

        // if(typers.some((typer) => typer.id === selectedUser._id))
        // {
        //     setTypingStatus(true)
        // }
        // else{
        //   setTypingStatus(false)
        // }

      });


      //   newSocket.on("getOnlineUsers", (userIds) => {
      //   setOnlineUsers(userIds);

      //   setTypers((prev) => {
      //     const filtered = prev.filter((typer) => userIds.includes(typer.id));

      //     if (selectedUser && filtered.some((typer) => typer.id === selectedUser._id)) {
      //       setTypingStatus(true);
      //     } else {
      //       setTypingStatus(false);
      //     }

      //     return filtered;
      //   });
      // });




    
      // 👇 Typing status received from the other user
      newSocket.on("show-typing", ({ senderId,receiverId }) => {
        
          console.log(senderId,receiverId)

          console.log("receiver Id : ",receiverId,"auth User : ",authUser?._id,"sender Id : ",senderId,"selectedUser : ",selectedOne)

          if(receiverId==authUser?._id )
          {
             setTypers((prev) => {
              if (!prev.some((typers) => typers.id === senderId)) {
                return [...prev, { id: senderId }];
              }
              return prev;
            });

          }
       
      });
    
      // newSocket.on("hide-typing", ({ senderId }) => {
      //   if (senderId === selectedUser._id) {
      //     setTypingStatus("");
      //   }
      // });
    };



    const disconnectSocket = () => {
      if (socket?.connected) socket.disconnect();
    };

  

  return (
    <ContextDef.Provider
      value={{
        authUser,
        isSigningUp,
        isLoggingIn,
        isUpdatingProfile,
        isCheckingAuth,
        socket,
        middlePage,
        chatName,
        yourName,
        messages,
        userMessages,
        setMiddlePage,
        setChatName,
        setYourName,
        setMessages,
        setUserMessages,
        checkAuth,
        signup,
        login,
        logout,
        updateProfile,
        connectSocket,
        disconnectSocket,
        myStatusesSending,setMyStatusesSending,

        // Added chat-store related states and functions
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        typingStatus,
        onlineUsers, 
        homeRightPage,
        
        homeRightPageChannel,
        addFriendProfile,
        notificationsProfile,
        AiRightPage,
        typers,
        screen, 
        setScreen,
        setTypers, 
        selectedUserStatus,
        rightPartActive ,
        setRightPartActive,
        selectedOne,
        setSelectedOne,
        setSelectedUserStatus,
        setAiRightPage,
        setNotificationsProfile,
        setAddFriendProfile,
        setHomeRightPage,
        setHomeRightPageChannel,
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
        subscribeToMessages,
        unsubscribeFromMessages,
       
        setTypingStatus,
        setOnlineUsers,
        sendVerifyOtpFun,
        verifyEmail,
        BASE_URL,
        setAuthUser
        

      }}
    >
      {props.children}
    </ContextDef.Provider>
  );
};

export default ContextProvider;

// optional easy way to use it
export const useAuthContext = () => useContext(ContextDef);

