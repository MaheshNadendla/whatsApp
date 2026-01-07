import React, { useContext } from "react";
import { FaUser, FaHouseUser } from "react-icons/fa";
import { MdEmail, MdVerified } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { ContextDef } from "../contextDef";

const RProfilePart = () => {
  const { authUser } = useContext(ContextDef);

  return (
    <div className="h-screen w-full bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-2xl font-bold">User Details</h2>
        <p className="text-gray-500 text-sm mt-1 mb-8">Viewing user information</p>

        <div className="flex flex-col items-center">
          <img
            src={authUser.profilePic || "defaultImg1.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover mb-6 border-2 border-gray-200"
          />

          <div className="w-full flex flex-col items-start">
            <div className="text-gray-400 text-sm flex items-center gap-2 mt-4 mb-1">
              <FaUser /> Full Name
            </div>
            <div className="w-full bg-white p-3 rounded-md border border-gray-300 text-left font-medium">
              {authUser.name}
            </div>

            <div className="text-gray-400 text-sm flex items-center gap-2 mt-4 mb-1">
              <MdEmail /> Email Address
            </div>
            <div className="w-full bg-white p-3 rounded-md border border-gray-300 text-left font-medium">
              {authUser.email}
            </div>

            <div className="text-gray-400 text-sm flex items-center gap-2 mt-4 mb-1">
              <FaHouseUser /> User Status
            </div>
            <div className="w-full bg-white p-3 rounded-md border border-gray-300 text-left font-medium">
              {authUser.status}
            </div>

            <div className="text-gray-400 text-sm flex items-center gap-2 mt-4 mb-1">
              <FaRegCalendarCheck /> User Since
            </div>
            <div className="w-full bg-white p-3 rounded-md border border-gray-300 text-left font-medium">
              {new Date(authUser.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="text-gray-400 text-sm flex items-center gap-2 mt-4 mb-1">
              <MdVerified /> Verified Status
            </div>
            <div className="w-full bg-white p-3 rounded-md border border-gray-300 text-left font-medium">
              {authUser.isVerified ? "Verified" : "Not Verified"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RProfilePart;
