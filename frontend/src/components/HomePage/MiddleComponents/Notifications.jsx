import React, { useContext, useEffect, useState } from 'react';
// import './Notifications.css';
import { FaUserClock, FaUserPlus, FaUserCheck } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../../lib/axios';
import { ContextDef } from '../contextDef';

const FriendRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [acceptedRequestsByYou, setAcceptedRequestsByYou] = useState([]); // ✅ NEW
  const [acceptedRequestsByThem, setAcceptedRequestsByThem] = useState([])
  const { notificationsProfile, setNotificationsProfile,rightPartActive ,setRightPartActive } = useContext(ContextDef); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const [friendRequests, acceptedRequests] = await Promise.all([
          axiosInstance.get('/users/friend-requests'),
          axiosInstance.get('/users/accepted-requests'),
        ]);

        setIncomingRequests(friendRequests.data.incomingReqs);
        setOutgoingRequests(friendRequests.data.outgoingReqs);

        setAcceptedRequestsByYou(acceptedRequests.data.acceptedReqsByYou); // ✅ SET acceptedReqs
        setAcceptedRequestsByThem(acceptedRequests.data.acceptedReqsByThem)

        console.log(friendRequests);
        console.log(acceptedRequests);
        
      } catch (error) {
        toast.error('Error fetching friend data');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendData();
  }, []);

  const handleAccept = (userId) => async () => {
    try {
      const res = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
      toast.success(res.data.message);

        setIncomingRequests(prev => {
          const updated = prev.filter(user => user._id !== userId);
          const movedUser = prev.find(user => user._id === userId);
          if (movedUser) {
            setAcceptedRequestsByYou(prevAccepted => [...prevAccepted, movedUser]);
          }
          return updated;
        });
        
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request');
    }
  };

  return (
    <div className="friend-requests-container w-full h-[100dvh] bg-white overflow-y-scroll p-4 sm:p-6 md:p-8 font-sans">
  {/* Friend Requests Received */}
  <h2 className="section-title text-xl sm:text-2xl md:text-3xl font-semibold my-4">Friend Requests Received</h2>
  {loading ? (
    <p className="loading-text text-base sm:text-lg md:text-xl text-gray-600 my-2">Loading...</p>
  ) : (
    <div className="requests-list flex flex-col gap-3">
      {incomingRequests.length > 0 ? (
        incomingRequests.map(req => (
          <div
            key={req._id}
            onClick={() => {setNotificationsProfile(req.sender);setRightPartActive(true)}}
            className={`request-card flex items-center rounded-xl border border-gray-200 cursor-pointer transition 
              p-2 sm:p-3 md:p-4 ${notificationsProfile === req.sender ? "bg-gray-100" : "bg-white hover:bg-gray-100"} h-[10dvh] sm:h-[11dvh] md:h-[12dvh]`}
          >
            <img
              src={req?.sender?.profilePic || 'defaultImg.png'}
              alt={req?.sender?.name}
              className="request-pic w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] rounded-full object-cover mr-3 sm:mr-4 md:mr-6"
            />
            <div className="request-info flex flex-col justify-between flex-1 min-w-0">
              <span className="request-name text-sm sm:text-lg md:text-xl font-medium truncate">{req?.sender?.name}</span>
              <span className="request-email text-xs sm:text-base md:text-lg text-gray-600 truncate">{req?.sender?.email}</span>
            </div>
            <button
              onClick={handleAccept(req._id)}
              className="accept-btn flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#25d366] hover:scale-110 transition"
            >
              <FcOk size={36} />
            </button>
          </div>
        ))
      ) : (
        <p className="empty-text text-base sm:text-lg md:text-xl text-gray-600 my-2">No friend requests received.</p>
      )}
    </div>
  )}

  {/* Friend Requests Sent */}
  <h2 className="section-title text-xl sm:text-2xl md:text-3xl font-semibold my-4">Friend Requests Sent</h2>
  <div className="requests-list flex flex-col gap-3">
    {outgoingRequests.length > 0 ? (
      outgoingRequests.map(req => (
        <div
          key={req._id}
          onClick={() =>{ setNotificationsProfile(req.recipient);setRightPartActive(true)}}
          className={`request-card flex items-center rounded-xl border border-gray-200 cursor-pointer transition 
            p-2 sm:p-3 md:p-4 ${notificationsProfile === req.recipient ? "bg-gray-100" : "bg-white hover:bg-gray-100"} h-[10dvh] sm:h-[11dvh] md:h-[12dvh]`}
        >
          <img
            src={req?.recipient?.profilePic || 'defaultImg.png'}
            alt={req?.recipient?.name}
            className="request-pic w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] rounded-full object-cover mr-3 sm:mr-4 md:mr-6"
          />
          <div className="request-info flex flex-col justify-between flex-1 min-w-0">
            <span className="request-name text-sm sm:text-lg md:text-xl font-medium truncate">{req?.recipient?.name}</span>
            <span className="request-email text-xs sm:text-base md:text-lg text-gray-600 truncate">{req?.recipient?.email}</span>
          </div>
          <div className="sent-icon flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-500">
            <FaUserClock size={32} />
          </div>
        </div>
      ))
    ) : (
      <p className="empty-text text-base sm:text-lg md:text-xl text-gray-600 my-2">No friend requests sent.</p>
    )}
  </div>

  {/* Accepted Requests By You */}
  <h2 className="section-title text-xl sm:text-2xl md:text-3xl font-semibold my-4">Friend Requests Accepted By You</h2>
  <div className="requests-list flex flex-col gap-3">
    {acceptedRequestsByYou?.length > 0 ? (
      acceptedRequestsByYou.map((friend, index) => {
        const sender = friend?.sender || friend;
        return (
          <div
            key={sender?._id || index}
            onClick={() =>{ setNotificationsProfile(sender);setRightPartActive(true)}}
            className={`request-card flex items-center rounded-xl border border-gray-200 cursor-pointer transition 
              p-2 sm:p-3 md:p-4 ${notificationsProfile === sender ? "bg-gray-100" : "bg-white hover:bg-gray-100"} h-[10dvh] sm:h-[11dvh] md:h-[12dvh]`}
          >
            <img
              src={sender?.profilePic || 'defaultImg.png'}
              alt={sender?.name}
              className="request-pic w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] rounded-full object-cover mr-3 sm:mr-4 md:mr-6"
            />
            <div className="request-info flex flex-col justify-between flex-1 min-w-0">
              <span className="request-name text-sm sm:text-lg md:text-xl font-medium truncate">{sender?.name}</span>
              <span className="request-email text-xs sm:text-base md:text-lg text-gray-600 truncate">{sender?.email}</span>
            </div>
            <div className="accepted-icon flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600">
              <FaUserCheck size={32} />
            </div>
          </div>
        );
      })
    ) : (
      <p className="empty-text text-base sm:text-lg md:text-xl text-gray-600 my-2">No friend requests accepted by you yet.</p>
    )}
  </div>

  {/* Accepted Requests By Friends */}
  <h2 className="section-title text-xl sm:text-2xl md:text-3xl font-semibold my-4">Friend Requests Accepted By Your Friends</h2>
  <div className="requests-list flex flex-col gap-3">
    {acceptedRequestsByThem?.length > 0 ? (
      acceptedRequestsByThem.map((friend, index) => {
        const recipient = friend?.recipient || friend;
        return (
          <div
            key={recipient?._id || index}
            onClick={() =>{setNotificationsProfile(recipient); setRightPartActive(true)}}
            className={`request-card flex items-center rounded-xl border border-gray-200 cursor-pointer transition 
              p-2 sm:p-3 md:p-4 ${notificationsProfile === recipient ? "bg-gray-100" : "bg-white hover:bg-gray-100"} h-[10dvh] sm:h-[11dvh] md:h-[12dvh]`}
          >
            <img
              src={recipient?.profilePic || 'defaultImg.png'}
              alt={recipient?.name}
              className="request-pic w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] rounded-full object-cover mr-3 sm:mr-4 md:mr-6"
            />
            <div className="request-info flex flex-col justify-between flex-1 min-w-0">
              <span className="request-name text-sm sm:text-lg md:text-xl font-medium truncate">{recipient?.name}</span>
              <span className="request-email text-xs sm:text-base md:text-lg text-gray-600 truncate">{recipient?.email}</span>
            </div>
            <div className="accepted-icon flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600">
              <FaUserCheck size={32} />
            </div>
          </div>
        );
      })
    ) : (
      <p className="empty-text text-base sm:text-lg md:text-xl text-gray-600 my-2">No friend requests accepted by your friends yet.</p>
    )}
  </div>
</div>

  );
};

export default FriendRequests;
