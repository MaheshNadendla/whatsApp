import React, { useContext } from 'react';
// import './Settings.css';
import SettingsOption from './SettingsOption';

import { MdLogout } from "react-icons/md";

import { FaKey, FaLock, FaComments, FaBell, FaKeyboard, FaQuestionCircle } from 'react-icons/fa';
import { ContextDef } from '../contextDef';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

  const{authUser,logout,setMiddlePage,setSelectedUser,setHomeRightPage,setHomeRightPageChannel,setAiRightPage,setSelectedUserStatus,setSelectedOne,setAddFriendProfile,setNotificationsProfile,setChatName} =useContext(ContextDef);

  const navigate = useNavigate();

  const logoutSubmit = async (e) => {
    try {
      await logout();
      navigate('/signup')
      setMiddlePage("chats");
      setSelectedUser(null);
      setHomeRightPage(null);
      setHomeRightPageChannel(null);
      setAiRightPage(null);
      setSelectedUserStatus(null);
      setSelectedOne(null);
      setAddFriendProfile(null);
      setNotificationsProfile(null);
      setChatName(null);
      
    } catch (error) {
      console.log('Something went wrong');
    }
  };



  return (
    <div className="settings-container p-6 h-screen w-full bg-white overflow-y-auto text-left text-base">

  {/* Header */}
  <div className="settings-header  w-full h-30  top-0 bg-white z-10 p-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-6">Settings</h2>
    <input
      type="text"
      placeholder="Search settings"
      className="search-input w-full h-14 sm:h-16 mt-4 px-4 rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>

  {/* Profile Section */}
  <div className="profile-section flex items-center p-4">
    <img
      src={authUser?.profilePic || "/avatar.png"}
      alt="Profile"
      className="profile-pic w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover mr-4"
    />
    <div className="settings-profile-info flex flex-col justify-center">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">{authUser?.name || "Mahesh"}</h3>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg">{authUser?.status || "Better to call, Instead text"}</p>
    </div>
  </div>

  {/* Options List */}
  <div className="options-list flex flex-col gap-4 p-4 ">
    <SettingsOption icon={<FaKey />} title="Account" description="Security notifications, account info " />
    <SettingsOption icon={<FaLock />} title="Privacy" description="Blocked contacts, disappearing messages" />
    <SettingsOption icon={<FaComments />} title="Chats" description="Theme, wallpaper, chat settings" />
    <SettingsOption icon={<FaBell />} title="Notifications" description="Message notifications" />
    <SettingsOption icon={<FaKeyboard />} title="Keyboard shortcuts" description="Quick actions" />
    <SettingsOption icon={<FaQuestionCircle />} title="Help" description="Help center, contact us, privacy policy" />
  </div>

  {/* Log Out */}
  <div className="log-out-container flex justify-start p-4 mt-6">
    <button
      onClick={logoutSubmit}
      className="logout-class flex items-center gap-4 p-4 rounded-lg hover:bg-red-100 transition"
    >
      <div className="logout-icon text-red-600 text-2xl"><MdLogout /></div>
      <div className="logout-btn text-red-600 text-lg sm:text-xl md:text-2xl font-medium">Log out</div>
    </button>
  </div>

</div>

  );
};

export default Settings;

