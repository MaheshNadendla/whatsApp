
// import socket from '../../../socket';

// import React, { useContext, useEffect, useState} from 'react';

// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuMessageSquarePlus } from "react-icons/lu";

// import { IoMdArrowBack } from "react-icons/io";

// import { GrSearch } from "react-icons/gr";
// import User from './SubMiddle/User';
// import { ContextDef } from '../contextDef';

// function Chats() {
//     const [searchDisplay,setSearchDisplay]=useState(true);

//     const [users,setUsers]=useState([]);

    

//     const [newUser,setNewUser]=useState(null);







//     const {setYourName} = useContext(ContextDef);
 


//     useEffect(() => {
//       socket.on("new_user", (id) => {
//         // console.log("Received new_user event:", id); // Debugging log
//         setNewUser(id);
//         setYourName(id);
//       });

      

//       socket.emit("get_user_id");
    
//       return () => {
//         socket.off("new_user");
//       };
//     }, []);



//     useEffect(() => {
//       socket.on("allUsers", (data) => {
//         setUsers(data); // Update state with the latest users list
//       });
//       socket.emit("receive_users");
//       return () => {
//         socket.off("allUsers");
//       };
//     }, []);

//     // console.log(messages);



//   return (
//     <div className='Chats'>
//       <div className='Nav'>

//             <div className='NavLeft'>
//                 <label className='Charts'>{newUser}</label>
//             </div>
//             <div className='NavRight'>
//                 <div className='Icon'>< BsThreeDotsVertical/></div>
//                 <div className='Icon'><LuMessageSquarePlus/></div>
//             </div>

//       </div>
//       <div className='Search'>
//         <div className='SearchBox'>
//           <button className='SearchBack'  onClick={()=>setSearchDisplay(!searchDisplay)}>
//             {searchDisplay ? <GrSearch/> : <IoMdArrowBack/>  }
//             </button>
//           <input onClick={()=>setSearchDisplay(!searchDisplay)} className='SearchBar' placeholder={ searchDisplay ? "Search" : ""}  type='text'/ >
//         </div>
        
//       </div>
//       <div className='List'>
//         <div className='ListItem'>All</div>
//         <div className='ListItem'>Unread</div>
//         <div className='ListItem'>Favourites</div>
//         <div className='ListItem'>Groups</div>
//         <div className='ListItem'>Others</div>
//       </div>
//       <div className='Users'>

//         {
//             users.map((data,index)=>
//             (
//               <User  name={data} key={index}/>
//             ))
//         }

        



//          {/* <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/>

//          <User name="one1"/>
//          <User name="one2"/>

//          <User name="one3"/>
//          <User name="one4"/>
         
//          <User name="one1"/>
//          <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/>
         
//          <User name="one1"/>
//          <User name="one2"/>
//          <User name="one3"/>
//          <User name="one4"/> */}
    

//       </div>
      

//     </div>
//   )
// }

// export default Chats




// import socket from '../../../socket';
// import React, { useContext, useEffect, useState } from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuMessageSquarePlus } from "react-icons/lu";
// import { IoMdArrowBack } from "react-icons/io";
// import { GrSearch } from "react-icons/gr";
// import User from './SubMiddle/User';
// import { ContextDef } from '../contextDef';

// function Chats() {
//   const [searchDisplay, setSearchDisplay] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState(null); // Will hold the socket ID
//   const { setYourName } = useContext(ContextDef);
//   const [socketConnected, setSocketConnected] = useState(false);

//   useEffect(() => {
//     // This will run when the socket is connected
//     socket.on('connect', () => {
//       setSocketConnected(true);
//       console.log('Socket connected with ID:', socket.id); // Check socket ID on connection
//     });

//     // Once connected, emit `get_user_id`
//     if (socketConnected) {
//       socket.emit('get_user_id');
//     }

//     socket.on('new_user', (id) => {
//       console.log('Received new_user event:', id); // Debugging log
//       setNewUser(id); // Set the socket ID once received
//       setYourName(id); // Assuming you're setting the name based on socket ID
//     });

//     // Cleanup socket listeners
//     return () => {
//       socket.off('connect');
//       socket.off('new_user');
//     };
//   }, [socketConnected, setYourName]);

//   useEffect(() => {
//     socket.on('allUsers', (data) => {
//       setUsers(data); // Update state with the latest users list
//     });

//     socket.emit('receive_users'); // Emit event to get all users

//     // Cleanup
//     return () => {
//       socket.off('allUsers');
//     };
//   }, []);

//   return (
//     <div className='Chats'>
//       <div className='Nav'>
//         <div className='NavLeft'>
//           <label className='Charts'>{newUser ? newUser : 'Loading...'}</label>
//         </div>
//         <div className='NavRight'>
//           <div className='Icon'>< BsThreeDotsVertical /></div>
//           <div className='Icon'><LuMessageSquarePlus /></div>
//         </div>
//       </div>
//       <div className='Search'>
//         <div className='SearchBox'>
//           <button className='SearchBack' onClick={() => setSearchDisplay(!searchDisplay)}>
//             {searchDisplay ? <GrSearch /> : <IoMdArrowBack />}
//           </button>
//           <input onClick={() => setSearchDisplay(!searchDisplay)} className='SearchBar' placeholder={searchDisplay ? "Search" : ""} type='text' />
//         </div>
//       </div>
//       <div className='List'>
//         <div className='ListItem'>All</div>
//         <div className='ListItem'>Unread</div>
//         <div className='ListItem'>Favourites</div>
//         <div className='ListItem'>Groups</div>
//         <div className='ListItem'>Others</div>
//       </div>
//       <div className='Users'>
//         {
//           users.map((data, index) => (
//             <User name={data} key={index} />
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default Chats;




// # not include import socket from '../../../socket';




// import React, { useContext, useEffect, useState } from 'react';
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { LuMessageSquarePlus } from "react-icons/lu";
// import { IoMdArrowBack } from "react-icons/io";
// import { GrSearch } from "react-icons/gr";
// import User from './SubMiddle/User';
// import { ContextDef } from '../contextDef';

// import './Chats.css'
// import Spinner from '../../utils/Loader';


// function Chats() {
//   const [searchDisplay, setSearchDisplay] = useState(true);
//   // const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState(null); // Will hold the socket ID
//   const { setYourName } = useContext(ContextDef);
//   const [socketConnected, setSocketConnected] = useState(false);


//   const { getUsers, users, isUsersLoading,selectedUser,setSelectedUser } = useContext(ContextDef);


  


//   // console.log(users)



//   // const { onlineUsers } = useAuthStore();
//   // const [showOnlineOnly, setShowOnlineOnly] = useState(false);

//   useEffect(() => {
//     getUsers();
//   }, []);

//   // const filteredUsers = showOnlineOnly
//   //   ? users.filter((user) => onlineUsers.includes(user._id))
//   //   : users;

//   if (isUsersLoading) return <Spinner/>;


//   // useEffect(() => {
//   //   // Listen for socket connection
//   //   socket.on('connect', () => {
//   //     setSocketConnected(true);
//   //     console.log('Socket connected with ID:', socket.id);
//   //   });

//   //   // Emit get_user_id once socket is connected
//   //   if (socketConnected) {
//   //     socket.emit('get_user_id');
//   //   }

//   //   // Listen for new user event and set the user's socket ID
//   //   socket.on('new_user', (msg) => {
//   //     console.log('Received new_user event:', msg.sid); // Debugging log
//   //     setNewUser(msg.uid); // Set the socket ID once received
//   //     setYourName(msg.sid); // Assuming you're setting the name based on socket ID
//   //   });

//   //   // Listen for all users event and update user list
//   //   socket.on('allUsers', (data) => {
//   //     setUsers(data); // Update users state with the latest list
//   //   });

//   //   // Request the list of users from the server
//   //   socket.emit('receive_users');

//   //   // Cleanup socket listeners when the component unmounts
//   //   return () => {
//   //     socket.off('connect');
//   //     socket.off('new_user');
//   //     socket.off('allUsers');
//   //   };
//   // }, [socketConnected, setYourName]);






//   return (
//     <div className="Chats">
//       <div className="Nav">
//         <div className="NavLeft">
//           <label className="Charts">{"WhatsApp"}</label>
//         </div>
//         <div className="NavRight">
//           <div className="Icon"><BsThreeDotsVertical /></div>
//           <div className="Icon"><LuMessageSquarePlus /></div>
//         </div>
//       </div>
      
//       <div className="Search">
//         <div className="SearchBox">
//           <button className="SearchBack" onClick={() => setSearchDisplay(!searchDisplay)}>
//             {searchDisplay ? <GrSearch /> : <IoMdArrowBack />}
//           </button>
//           <input 
//             onClick={() => setSearchDisplay(!searchDisplay)} 
//             className="SearchBar" 
//             placeholder={searchDisplay ? "Search" : ""} 
//             type="text" 
//           />
//         </div>
//       </div>

//       <div className="List">
//         <div className="ListItem">All</div>
//         <div className="ListItem">Unread</div>
//         <div className="ListItem">Favourites</div>
//         <div className="ListItem">Groups</div>
//         <div className="ListItem">Others</div>
//       </div>

//       <div className="Users">
//         {users.map((user, index) => (
         
//           <User key={index} user={user} />
         
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chats;



import React, { useContext, useEffect, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuMessageSquarePlus } from "react-icons/lu";
import { IoMdArrowBack } from "react-icons/io";
import { GrSearch } from "react-icons/gr";
import User from './SubMiddle/User';
import { ContextDef } from '../contextDef';
// import './Chats.css';
import Spinner from '../../utils/Loader';

function Chats() {
  const [searchDisplay, setSearchDisplay] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 👈 For live input text
  const { getUsers, users, isUsersLoading } = useContext(ContextDef);

  useEffect(() => {
    getUsers();
  }, []);

  if (isUsersLoading) return <Spinner />;

  // 👇 Filter users based on name or email
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col h-screen w-full bg-white border border-gray-200">
  
  {/* Nav */}
  <div className="flex justify-between items-center px-5" style={{height: "12%"}}>
    <div className="text-2xl font-bold">WhatsApp</div>
    <div className="flex gap-2">
      <div className="flex items-center justify-center h-16 w-16 rounded-full text-2xl hover:bg-gray-100 cursor-pointer">
        <BsThreeDotsVertical />
      </div>
      <div className="flex items-center justify-center h-16 w-16 rounded-full text-2xl hover:bg-gray-100 cursor-pointer">
        <LuMessageSquarePlus />
      </div>
    </div>
  </div>

  {/* Search */}
  <div className="flex justify-center items-center px-5" style={{height: "8%"}}>
    <div className="flex items-center w-[98%]  h-12 bg-gray-200 rounded-lg border border-gray-200 px-3">
      <button
        className="flex items-center justify-center h-full px-2 text-xl text-gray-600"
        onClick={() => setSearchDisplay(!searchDisplay)}
      >
        {searchDisplay ? <GrSearch /> : <IoMdArrowBack onClick={()=>setSearchQuery("")} />}
      </button>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        className="flex-1 h-full bg-transparent outline-none px-2 text-base"
      />
    </div>
  </div>

  {/* Tabs */}
  <div className="flex items-center px-5 gap-2 overflow-x-auto" style={{height: "8%"}}>
    {['All', 'Unread', 'Favourites', 'Groups', 'Others'].map((tab, i) => (
      <div
        key={i}
        className="flex-shrink-0 bg-gray-200 px-4 py-2 rounded-full border border-gray-200 cursor-pointer text-sm whitespace-nowrap"
      >
        {tab}
      </div>
    ))}
  </div>

  {/* Users */}
  <div className="flex-1 overflow-y-auto px-2" style={{height: "72%"}}>
    {filteredUsers.length > 0 ? (
      filteredUsers.map((user, index) => <User key={index} user={user} />)
    ) : (
      <div className="text-center mt-5 text-gray-500 text-base font-medium">No users found.</div>
    )}
  </div>
</div>

  );
}

export default Chats;




