import React, { useContext, useState } from "react";
import { LuMessageSquareText } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaMeta, FaUsersViewfinder } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ContextDef } from "../contextDef";

function Icons() {
  const { middlePage, setMiddlePage, authUser } = useContext(ContextDef);
  const [isOpen, setIsOpen] = useState(false);

  const activeBg = (page) =>
    middlePage === page ? "bg-[#25d366] text-white" : "bg-white text-black";

  return (
    <>
      {/* Desktop / Laptop */}
      <div className=" flex flex-col justify-between items-center   h-full w-full bg-[#f0f2f5] ">
        <div className="flex flex-col gap-4 items-center">

          <div className="w-0 h-16 lg:h-0 "></div>

          {[{ icon: <LuMessageSquareText />, page: "chats" },
            { icon: <MdOutlineVideoLibrary />, page: "status" },
            { icon: <GrChannel />, page: "channels" },
            { icon: <RiUserCommunityFill />, page: "community" },
            { icon: <FaMeta />, page: "ai" },
            { icon: <FaUsersViewfinder />, page: "addfriends" },
            { icon: <IoMdNotificationsOutline />, page: "notifications" },
          ].map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full border border-gray-200 text-2xl cursor-pointer hover:scale-105 transition hover:bg-[#25D3659a] ${activeBg(item.page)}`}
              onClick={() => setMiddlePage(item.page)}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Profile & Settings */}
        <div className="flex flex-col gap-4 items-center">
          <div
            className="flex justify-center items-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full border border-gray-200 cursor-pointer hover:scale-105 transition"
            onClick={() => setMiddlePage("profile")}
          >
            <img
              src={authUser?.profilePic || "defaultImg.png"}
              alt="profile"
              className="h-full w-full rounded-full border border-gray-300 object-cover"
            />
          </div>
          <div
            className={`flex justify-center items-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-16 lg:w-16 rounded-full border border-gray-200 text-2xl cursor-pointer hover:scale-105 transition ${activeBg("settings")}`}
            onClick={() => setMiddlePage("settings")}
          >
            <IoSettingsOutline />
          </div>

          <div className="w-0 lg:h-0 "></div>
        </div>
      </div>


    </>
  );
}

export default Icons;
