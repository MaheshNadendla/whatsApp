import React, { useContext, useEffect, useState } from 'react';
// import './AddFriends.css';

import { FaUserPlus } from "react-icons/fa";
import { axiosInstance } from '../../../lib/axios';
import toast from 'react-hot-toast';
import { ContextDef } from '../contextDef';

const AddFriends = () => {
  const [search, setSearch] = useState('');
  const [mySuggestions, setMySuggestions] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const { addFriendProfile,setAddFriendProfile,rightPartActive ,setRightPartActive} = useContext(ContextDef);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsSuggestionsLoading(true);
      try {
        const res = await axiosInstance.get("/users/search");
        console.log(res.data);
        setMySuggestions(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch messages");
      } finally {
        setIsSuggestionsLoading(false);
      }
    };

    fetchFriends();
  }, []); // Empty dependency to run only once

  const handleAddFriend =  async (friendId) => {
    try {   

      console.log("bro 2 called")

        const res = await axiosInstance.post(`/users/friend-request/${friendId}`);
        console.log(res.data.data);
        toast.success(res.data.message);
    } catch (error) {
        console.error(error);   
        toast.error(error.response?.data?.message || "Failed to send friend request");
    }   
    };


  const filteredFriends = mySuggestions.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase()) ||
    friend.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
        <div className="w-full h-[100dvh] bg-[#f9f9f9] font-sans overflow-y-scroll overflow-x-hidden">
      {/* Input Section */}
      <div className="flex justify-center items-center w-full">
        <input
          type="text"
          className="w-[92%] px-8 py-2 mb-4 my-5 text-lg rounded-md border border-gray-300 outline-none"
          placeholder="Find for a friend..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Suggested Friends List */}
      <div className="flex flex-col gap-2 items-center">
        {filteredFriends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => {setAddFriendProfile(friend) ;setRightPartActive(true) }}
             className={`flex items-center   w-[92%] py-0 px-2 mx-2 sm:mx-3 md:mx-4 lg:mx-8 sm:py-1 md:py-2 lg:py-3 rounded-xl shadow-md border border-gray-200 cursor-pointer transition 
              ${friend === addFriendProfile ? "bg-gray-100" : "bg-[#f9f9f9] hover:bg-gray-100"}
              h-[8dvh] sm:h-[9dvh] md:h-[10dvh] lg:h-[12dvh]  `}
          >
                        {/* Friend Photo */}
            <img
              src={friend?.profilePic || "defaultImg.png"}
              alt={friend.name}
              className="
                w-[55px] h-[55px]         /* default for mobile */
                sm:w-[65px] sm:h-[65px]   /* tablet */
                md:w-[75px] md:h-[75px]   /* desktop */
                rounded-full object-cover border border-black/10 
                mr-1
                sm:mr-3
                md:mr-5
                xl:mr-6
                ml-1
              "
            />


            {/* Friend Info */}
            <div className="flex flex-col gap-1 w-full  min-w-0">
              <div className="font-light text-sm sm:text-lg md:text-xl lg:text-xl break-words">
                {friend.name}
              </div>
              <div className="text-gray-600 text-sm sm:text-lg md:text-xl lg:text-xl break-words">
                {friend.email}
              </div>
            </div>


            {/* Add Friend Button */}
            <button
              onClick={(e) => {
                  e.stopPropagation();   
                  handleAddFriend(friend._id);
                  // <=still ths handleAddFriend not calling
                }}
              // <= real time problem inside button is notclicking what the fuck
              className="text-[#25d366] p-2 h-10px  rounded-full transition hover:scale-110 hover:text-green-600
              h-16
              sm:h-16
              md:h-20
              xl:h-20
              w-16
              sm:w-16
              md:w-20
              xl:w-18
              "
            >
              <FaUserPlus  className="w-full h-full p-1"/>
            </button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default AddFriends;
