import React, { useContext } from "react";
import { FaUser, FaHouseUser, FaRegCalendarCheck } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { ContextDef } from "../../contextDef";

const NotificationProfile = () => {
  const { notificationsProfile } = useContext(ContextDef);

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-8">
      <div className="bg-white max-w-xl w-full p-12 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold">User Details</h2>
        <p className="text-gray-500 mt-1 mb-8">Viewing user information</p>

        <div className="flex flex-col items-center">
          <img
            src={notificationsProfile.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 mb-6"
          />

          <div className="w-full">
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-4 mb-1">
              <FaUser /> Full Name
            </div>
            <div className="w-full bg-white border border-gray-300 rounded-md p-3 text-left font-medium text-base">
              {notificationsProfile.name}
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-4 mb-1">
              <MdEmail /> Email Address
            </div>
            <div className="w-full bg-white border border-gray-300 rounded-md p-3 text-left font-medium text-base">
              {notificationsProfile.email}
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-4 mb-1">
              <FaHouseUser /> User Status
            </div>
            <div className="w-full bg-white border border-gray-300 rounded-md p-3 text-left font-medium text-base">
              {notificationsProfile.status}
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-4 mb-1">
              <FaRegCalendarCheck /> User since
            </div>
            <div className="w-full bg-white border border-gray-300 rounded-md p-3 text-left font-medium text-base">
              {new Date(notificationsProfile.createdAt).toLocaleDateString(
                "en-IN",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mt-4 mb-1">
              <MdVerified /> is Verified
            </div>
            <div className="w-full bg-white border border-gray-300 rounded-md p-3 text-left font-medium text-base">
              {notificationsProfile.isVerified ? "Verified" : "Not Verified"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationProfile;
