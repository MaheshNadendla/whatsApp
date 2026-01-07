import React, { useState, useEffect, useRef, useContext } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import MyStatus from "./SubMiddle/MyStatus";
import StatusVideo from "./SubMiddle/StatusVideo";
// import "./Status.css";
import { ContextDef } from "../contextDef";
import { axiosInstance } from "../../../lib/axios";
import BtnLoader from "../../utils/BtnLoader";
import toast from "react-hot-toast";

function Status() {
  const { authUser,selectedUserStatus, setSelectedUserStatus,myStatusesSending,setMyStatusesSending } = useContext(ContextDef);
  const [friendStatuses, setFriendStatuses] = useState([]);
  const fileInputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);



 const [groupedStatuses, setGroupedStatuses] = useState({});


 const handleSend = async () => {
    
    if (!selectedFile || !previewSrc) return;
    setIsUploading(true);

    try {
      const res = await axiosInstance.post("/messages/status", {
        image: previewSrc,
      });

      toast.success(res.data.message);

      // Refresh status feed
      const { data } = await axiosInstance.get("/messages/status/friends");
      setFriendStatuses(data);

      // Clear preview and file
      setSelectedFile(null);
      setPreviewSrc(null);
    } catch (err) {
      toast.error("Failed to upload status");
      console.error(err);
    } finally {
      setIsUploading(false);
      setMyStatusesSending(!myStatusesSending);
    }
  };



useEffect(() => {
  const fetchStatuses = async () => {
    try {
      const { data } = await axiosInstance.get("/messages/status/friends");

      // Grouping logic
      const grouped = {};
      data.forEach((status) => {
        const userId = status.user._id;
        if (!grouped[userId]) {
          grouped[userId] = {
            user: status.user, // store user info once
            statuses: [],
          };
        }
        grouped[userId].statuses.push(status);
      });

      setGroupedStatuses(grouped);
    } catch (err) {
      console.error("Failed to load statuses:", err);
    }
  };

  fetchStatuses();
}, []);

  const handleAddClick = () =>{ 
    setSelectedUserStatus(null);
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewSrc(null);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">

  {/* Header */}
  <div className="w-full flex justify-between items-center h-20 sm:h-24 md:h-28 px-4 sm:px-6 md:px-8">
    <label className="text-2xl sm:text-3xl md:text-4xl font-bold">Status</label>

    <div className="flex items-center space-x-3">
      <div className="h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-full text-2xl cursor-pointer bg-gray-100">
        <BsThreeDotsVertical />
      </div>
      <div
        className="h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-full text-2xl cursor-pointer bg-gray-100"
        onClick={handleAddClick}
      >
        <FaPlus />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  </div>

  {/* Status Bar */}
  <div className="flex-1 overflow-y-auto bg-white px-4 sm:px-6 md:px-8">
    <MyStatus />

    <div className="mt-4 space-y-4">
      {Object.keys(groupedStatuses).length === 0 ? (
        <div className="py-16 text-center text-gray-500 italic">
          No statuses available
        </div>
      ) : (
        Object.values(groupedStatuses).map((group) => (
          <StatusVideo key={group.user._id} status={group} />
        ))
      )}
    </div>
  </div>

  {/* Fullscreen Preview Overlay */}
  {previewSrc && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
      <div className="relative max-w-full sm:max-w-3xl md:max-w-4xl max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] flex justify-center items-center">
        {selectedFile.type.startsWith("video") ? (
          <video src={previewSrc} controls className="max-w-full max-h-full rounded-lg shadow-lg border border-black" />
        ) : (
          <img src={previewSrc} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg border border-black" />
        )}

        <button
          className="absolute top-2 left-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 text-white px-4 py-1 rounded-md z-50"
          onClick={handleSend}
          disabled={isUploading}
        >
          {isUploading ? <BtnLoader size="sm" /> : "Upload"}
        </button>

        <button
          className="absolute top-2 right-2 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 text-white p-2 rounded-full z-50 flex justify-center items-center"
          onClick={handleClear}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  )}
</div>

  );
}

export default Status;
