import React, { useContext } from "react";
import { FaUser, FaHouseUser, FaRegCalendarCheck } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { ContextDef } from "../../contextDef";

const AddFriendComponent = () => {
  const { addFriendProfile } = useContext(ContextDef);

  return (
    <div className="h-screen w-full bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold">{addFriendProfile.name}</h2>
        <p className="text-gray-500 mt-1 mb-8">Viewing user information</p>

        <div className="flex flex-col items-center">
          <img
            src={addFriendProfile.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-6 border-2 border-gray-200"
          />

          <div className="w-full text-left">
            <div className="text-gray-400 flex items-center gap-2 mt-4 mb-1">
              <FaUser /> Full Name
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-300 font-medium">
              {addFriendProfile.name}
            </div>

            <div className="text-gray-400 flex items-center gap-2 mt-4 mb-1">
              <MdEmail /> Email Address
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-300 font-medium">
              {addFriendProfile.email}
            </div>

            <div className="text-gray-400 flex items-center gap-2 mt-4 mb-1">
              <FaHouseUser /> User Status
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-300 font-medium">
              {addFriendProfile.status}
            </div>

            <div className="text-gray-400 flex items-center gap-2 mt-4 mb-1">
              <FaRegCalendarCheck /> User Since
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-300 font-medium">
              {new Date(addFriendProfile.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="text-gray-400 flex items-center gap-2 mt-4 mb-1">
              <MdVerified /> Verified
            </div>
            <div className="bg-white p-3 rounded-md border border-gray-300 font-medium">
              {addFriendProfile.isVerified ? "Verified" : "Not Verified"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendComponent;
