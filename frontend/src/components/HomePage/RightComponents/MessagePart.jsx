import React, { useContext, useEffect, useRef, useState } from 'react';
import { GrSearch } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { RiEmojiStickerFill } from "react-icons/ri";
import { FaPhotoVideo } from "react-icons/fa";
// import socket from '../../../socket';
import { ContextDef } from '../contextDef';

import BtnLoader from '../../utils/BtnLoader'


// import './MessagePart.css'
import RightPart from './RightPart';
import { ChatBubble } from './ChatBubble';

import toast from 'react-hot-toast'
import TypingDots from './SubRight/TypingDots';
import socket from '../../../socket';

function MessagePart() {
  const [inputValue, setInputValue] = useState("");
  const [sendingMessageLoader,setSendingMessageLoader]=useState(false)
  const { userMessages, setUserMessages,socket } = useContext(ContextDef);

  const {typingStatus, setTypingStatus,typers,setTypers}=useContext(ContextDef);
  const{ messages,getMessages,isMessagesLoading,selectedUser, authUser,subscribeToMessages,unsubscribeFromMessages,sendMessage,setMessages}= useContext(ContextDef);
  

  // const { messages, setMessages } = useContext(ContextDef);
  const { chatName, yourName } = useContext(ContextDef);

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);



  const messageInputHadle = (e)=>{

    console.log("the authUser : ",authUser)
    console.log("the selectedUser : ",selectedUser)

    setInputValue(e.target.value)

    console.log("socket : ",socket)


    socket.emit("typing", {
      senderId: authUser._id,
      receiverId: selectedUser._id,
    });


  
  

  }


  const handleImageChange = (e) => {

    const file = e.target.files?.[0];
    if (!file) {
      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    e.target.value = "";

  };





  useEffect(() => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [selectedUser]);
  


  // console.log(messages)


  useEffect(() => {
    // console.log("hello")
    if (!selectedUser?._id) return;

    getMessages(selectedUser?._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();


    
  }, [selectedUser?._id,subscribeToMessages,unsubscribeFromMessages]);



  // useEffect(() => {
  //   if (!selectedUser?._id || !socket) return;
  
  //   getMessages(selectedUser._id);
  
  //   console.log("hello2");
  //   console.log("Socket connected:", socket?.connected);
  //   console.log("Subscribed to newMessage for", selectedUser._id);
  
  //   const handleNewMessage = (newMessage) => {
  //     console.log("New message received from socket:", newMessage);
  
  //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  //     console.log("Incoming message senderId:", newMessage.senderId);
  //     console.log("Selected user _id:", selectedUser._id);
  
  //     if (!isMessageSentFromSelectedUser) return;
  
  //     setMessages((prev) => {
  //       console.log("Adding new message to state");
  //       return [...prev, newMessage]; // ❓ this still seems odd
  //     });
  //   };
  
  //   socket.off("newMessage"); // Always clear old handler before setting new one
  //   socket.on("newMessage", handleNewMessage);
  
  //   return () => {
  //     console.log("Unsubscribing from newMessage");
  //     socket.off("newMessage", handleNewMessage);
  //   };
  // }, [selectedUser?._id, socket]); // ✅ Clean dependencies
  



  
  // console.log(messages)



  


  const [newUser, setNewUser] = useState(null);









  const handleSendPrivateMessage = async (e) => {

    console.log("sending message in handleSendPrivateMessage")

    setSendingMessageLoader(true)

    e.preventDefault();
    if (!inputValue.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: inputValue.trim(),
        image: imagePreview,
      });

      // Clear form
      setInputValue("")
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    finally{
      setSendingMessageLoader(false)
    }
  };


  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages,typers]); // Trigger effect when messages change



  useEffect(() => {
  const interval = setInterval(() => {
    setTypers((prev) => {
      if (prev.length === 0) return prev; // do nothing if empty
      const updated = prev.slice(0, -1); // remove last item
      return updated;
    });
  },3000); // every 3 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, []);



  // console.log(typingStatus)

  // console.log("messages : ",messages)

  


  if(!selectedUser)
  {
    return <><RightPart/></>
  }

  return (
    <div className="h-screen w-full flex flex-col">
  {/* Top Section */}
  <div className="h-[11%] w-full bg-[#f0f2f5] flex items-center">
    {/* Photo */}
    <div className="flex items-center justify-center 
                    w-1/5 sm:w-1/6 md:w-1/6 lg:w-1/6 h-full">
      <div className="w-16 h-16 sm:w-16 sm:h-18 md:w-18 md:h-18 lg:w-20 lg:h-20
                      bg-black rounded-full flex items-center justify-center overflow-hidden">
        <img
          src={selectedUser?.profilePic || 'defaultImg.png'}
          alt="User Photo"
          className="h-full w-full object-cover rounded-full"
        />
      </div>
    </div>

    {/* Name + Info */}
    <div className="flex flex-col justify-center items-start 
                    w-4/5 sm:w-5/6 md:w-5/6 lg:w-5/6 h-full pl-2 sm:pl-4">
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold py-0.5">
        {authUser?._id === selectedUser?._id ? "You" : selectedUser?.name}
      </div>
      <div className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-600 py-0.5">
        Click here for info
      </div>
    </div>


    {/* Icons */}
    <div className="h-full w-[16%] flex items-center justify-around text-2xl">
      <div className="cursor-pointer">
        <GrSearch />
      </div>
      <div className="cursor-pointer">
        <BsThreeDotsVertical />
      </div>
    </div>
  </div>

  {/* Center Section */}
  <div className="h-[78%] w-full bg-[#e0e0e0] flex flex-col overflow-y-auto relative">
    {/* Image Preview */}
    {imagePreview && (
      <div className="absolute bottom-[11%] left-[72.5%] -translate-x-1/2 m-2 p-2 bg-[#f0f0f0] rounded-lg shadow-md max-w-[70%]">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full max-h-[250px] object-contain rounded-md"
        />
        <button
          onClick={() => setImagePreview(null)}
          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center"
        >
          ❌
        </button>
      </div>
    )}

    {/* Messages */}
    {messages.map((msg, index) => (
      <span key={index}>
        <ChatBubble
          message={msg?.text}
          image={msg?.image}
          isSender={authUser?._id === msg?.senderId}
          time={new Date(msg?.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
          status={authUser?._id === msg?.senderId ? "sent" : ""}
        />
      </span>
    ))}

    {typers.some((typer) => typer.id === selectedUser._id) && <TypingDots />}
    <div ref={messagesEndRef} />
  </div>

  {/* Bottom Section */}
  <div className="h-[11%] w-full bg-[#f0f2f5] flex items-center justify-between px-2">
    <input
      type="file"
      accept="image/*"
      className="hidden"
      ref={fileInputRef}
      onChange={handleImageChange}
    />

    {/* Plus */}
    <button
      onClick={() => fileInputRef.current?.click()}
      className="w-[12%] flex justify-center items-center text-2xl text-black/70 bg-transparent border-none cursor-pointer"
    >
      <FaPhotoVideo />
    </button>

    {/* Input */}
    <div className="bg-white w-[76%] h-[55%] rounded-lg border border-black/10 flex items-center">
      <button className="h-full w-[10%] bg-transparent border-none text-2xl text-black/75 flex items-center justify-center">
        <RiEmojiStickerFill />
      </button>
      <input
        value={inputValue}
        type="text"
        onChange={messageInputHadle}
        className="h-full w-[90%] bg-transparent border-none outline-none text-lg px-2"
      />
    </div>

    {/* Mic / Send */}
    <div className="w-[12%] flex justify-center items-center text-2xl text-black/70">
      {sendingMessageLoader ? (
        <BtnLoader />
      ) : inputValue !== "" || imagePreview ? (
        <IoSendSharp onClick={handleSendPrivateMessage} />
      ) : (
        <FaMicrophone />
      )}
    </div>
  </div>
</div>
  );
}

export default MessagePart;
















  // Function to send the message
  // const sendMessage = () => {
  //   // Update local message state
  //   // setMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);
  //   setUserMessages(p => [...p, { senderId: yourName, message: inputValue, receiverId: chatName }]);


  //   // Emit to server
  //   // socket.emit("sendMessage", inputValue);

  //   // Log the sent message to console
  //   console.log('Sent message:', inputValue);

  //   console.log(messages)

  //   // Clear input
  //   setInputValue("");
  // };


  //const handleSendPrivateMessage =()=>{





   // console.log(inputValue)
    //sendMessage({text : inputValue,})
    //setInputValue("")





    // setMessages(p => [ { senderId: yourName, message: inputValue, receiverId: chatName },...p]);
    // setUserMessages(p => [{ senderId: yourName, message: inputValue, receiverId: chatName },...p]);

    // // Emit to server
    // // socket.emit("sendPrivateMessage",{ senderId: yourName, message: inputValue, receiverId: chatName });

    // // Log the sent message to console
    // console.log('Sent message:', inputValue);

    // // Clear input
    // setInputValue("");


  //}


  


  // useEffect(() => {
  //   const handleNewUser = ( msg) => {
  //     setNewUser(msg.uid);
  //     console.log('New user connected:', msg.sid); // Log new user connection
  //   };

  //   const handleReceivePrivateMessage = (m) => {
  //     console.log("message : ", m);

  //     // senderId: 'KSCriGPy6sxMB_vvAAAz', message: 'hello', receiverId: 'RnXhu9vfHcWmhw6uAAAx
    
  //     setMessages((p) => [ {
  //       senderId: m.senderId,
  //       message: m.message,
  //       receiverId: m.receiverId,
  //     },...p]);
    
  //     setUserMessages((p) => [ {
  //       senderId: m.senderId,
  //       message: m.message,
  //       receiverId: m.receiverId,
  //     },...p]);
    
  //     console.log('Received message:', m); 
  //     console.log(messages)
  //     // Do NOT rely on messages here — it won't show the new one yet.
  //   };
    

  //   const handleReceiveMessage = (msg) => {
  //     setMessages((p) => [msg, ...p]);
  //     setUserMessages((p) => [msg, ...p]);
  //     console.log('Received message:', msg); // Log received message
  //     console.log(messages)
  //   };

  //   socket.on("new_user", handleNewUser);
  //   socket.on("receiveMessage", handleReceiveMessage);
  //   socket.on("receivePrivateMessage",handleReceivePrivateMessage)

  //   socket.emit("get_user_id");

  //   return () => {
  //     socket.off("new_user", handleNewUser);
  //     socket.off("receiveMessage", handleReceiveMessage);
  //     socket.off("receivePrivateMessage", handleReceivePrivateMessage);
  //   };
  // }, []);

  
 




 

  // console.log("selected : ",selectedUser,authUser)


  // console.log("chatName : ",chatName)