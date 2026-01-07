import React from "react";
import { useState } from "react";

const CmtyChnl = ({ logo, name, bio, followers, followed }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100 p-10">
      <div
        className={`bg-white border border-gray-300 rounded-2xl w-3/4 max-w-lg h-5/6 flex flex-col items-center justify-center   gap-4 text-center transition-all duration-500 
        ${isHovered ? "rotate-90 shadow-2xl rounded-[50px] border-none" : "rotate-0"}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex flex-col items-center gap-4 transition-transform duration-500
          ${isHovered ? "-rotate-90" : "rotate-0"}`}
        >
          <img
            src={logo}
            alt={`${name} logo`}
            className="w-48 h-48 rounded-full object-cover border-2 border-green-200 bg-white"
          />
          <h2 className="text-black text-xl font-semibold">{name}</h2>
          <p className="text-gray-500 text-sm">{bio}</p>

          <button
            className={`bg-green-500 text-gray-900 font-bold py-2 px-6 rounded-full transition-all duration-300 
            hover:bg-green-600 hover:text-white hover:scale-105`}
          >
            {followed ? "Following" : "Follow"}
          </button>

          <p className="text-gray-400 text-xs mt-3">{followers} Followers</p>
        </div>
      </div>
    </div>
  );
};

export default CmtyChnl;
