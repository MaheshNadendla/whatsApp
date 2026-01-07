import React, { useContext, useEffect, useRef } from 'react'
import { ContextDef } from '../../contextDef';
// import './User.css'



function User({user}) {

  const {
  setChatName,
  messages, setMessages,
  userMessages, setUserMessages,
  yourName, selectedUser, setSelectedUser,
  typingStatus, setTypingStatus,
  onlineUsers, setOnlineUsers,
  typers, setTypers,
  selectedOne,setSelectedOne,
  rightPartActive ,setRightPartActive
} = useContext(ContextDef);


useEffect(() => {
  console.log("selectedUser changed:", selectedUser);
}, [selectedUser]);






      // console.log("ref : ",selectedUser)

      // Keep ref in sync
  

  const showMessages = () => {
    // setChatName(user.name);

    

    console.log("user : ",user)
    setSelectedUser(user)
    setRightPartActive(true);


    










    // console.log("the user : ",user)
    
    
    // let filteredMessages = [];
  
    // console.log(yourName + "  " + user.name);
    // console.log(`These are messages :`, messages); 
  
    // messages.forEach(user => {

    //   console.log("user here : ",user,user.name,yourName)

    //   console.log("userId : ",user.senderId,"your name : ",yourName,"reciverId : ",user.receiverId,"name : ",user.name)

    //   if ((user.senderId === yourName && user.receiverId === user.name) || 
    //       (user.senderId === user.name && user.receiverId === yourName)) {

            

    //     filteredMessages.push({
    //       senderId: user.senderId,
    //       message: user.message,
    //       receiverId: user.receiverId
    //   ``  });
    //   }
    // });
  
   
    // setUserMessages(filteredMessages);
  
    // console.log(`User Messages :`, filteredMessages);
  };



  return (
    <div
      className={`flex flex-col w-full cursor-pointer hover:bg-[#f0f2f5b1] ${
        selectedUser?._id === user._id ? "bg-[#f0f2f5]" : ""
      }`}
    >
      {/* Main user row */}
      <div onClick={showMessages} className="flex items-center h-24 px-4">
        {/* Photo & online indicator */}
        <div className="relative flex items-center justify-center w-1/5">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-black flex items-center justify-center">
            <img
              src={user?.profilePic || "defaultImg.png"}
              alt="User"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          {onlineUsers.includes(user._id) && (
            <span className="absolute right-1 bottom-0  sm:bottom-1 sm:right-6 md:bottom-1 md:right-0 lg:bottom-1 lg:right-8 h-6 w-6 rounded-full border-2 border-white bg-[#25D366]" />
          )}
        </div>

        {/* Messages info */}
        <div className="flex flex-col justify-center w-4/5 h-full">
          {/* Name and online/offline */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-medium text-gray-800">{user?.name}</div>
            <div className="text-sm text-gray-500">
              {onlineUsers.includes(user._id) ? "online" : "offline"}
            </div>
          </div>

          {/* Email and unread count */}
          <div className="flex justify-between items-center">
            <div className="text-gray-600">{user?.email}</div>
            <div className="h-7 w-7 bg-[#25D366] text-white flex items-center justify-center rounded-full">
              5
            </div>
          </div>
        </div>
      </div>

      {/* Line separator */}
      <div className="flex w-full">
        <div className="flex-1 h-px bg-gray-300 mx-4" />
      </div>
</div>

  )
}

export default User
