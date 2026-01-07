import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../../lib/axios";
import { ContextDef } from "../../contextDef";

function MyStatus() {
  const [myStatuses, setMyStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedUserStatus, setSelectedUserStatus, authUser, myStatusesSending } = useContext(ContextDef);

  useEffect(() => {
    const fetchMyStatuses = async () => {
      try {
        const response = await axiosInstance.get("/messages/status/my");
        setMyStatuses(response.data);
      } catch (error) {
        console.error("Error fetching your status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStatuses();
  }, [myStatusesSending]);

  if (loading || myStatuses.length === 0) {
    // Show fallback / loading
    return (
      <div
        className="flex flex-col md:flex-row items-center bg-white p-2 md:p-4 rounded-lg gap-3 md:gap-4 cursor-pointer"
        onClick={() => setSelectedUserStatus([])}
      >
        {/* Photo */}
        <div className="flex items-center justify-center">
          <img
            src={authUser?.profilePic || "defaultImg.png"}
            alt="profile"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-gray-300"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="text-base md:text-lg font-semibold">{`MyStatus (${authUser?.name})`}</div>
          <div className="text-sm md:text-base text-gray-500">Click here to add status</div>
        </div>
      </div>
    );
  }

  const user = myStatuses[0].user;
  const lastStatus = myStatuses[myStatuses.length - 1];
  const formattedTime = new Date(lastStatus.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Generate conic gradient for status ring
  const segments = myStatuses.length;
  const segmentAngle = 360 / segments;
  let conicGradient = "";
  for (let i = 0; i < segments; i++) {
    const start = i * segmentAngle;
    const end = start + segmentAngle - 2;
    conicGradient += `blue ${start}deg ${end}deg, transparent ${end}deg ${start + segmentAngle}deg, `;
  }
  conicGradient = `conic-gradient(${conicGradient.slice(0, -2)})`;

  return (
    <div
      className="flex flex-col md:flex-row items-center bg-white p-2 md:p-4 rounded-lg gap-3 md:gap-4 cursor-pointer"
      onClick={() => setSelectedUserStatus(myStatuses)}
    >
      {/* Photo with conic gradient ring */}
      <div className="flex items-center justify-center rounded-full p-[2px]" style={{ background: conicGradient }}>
        <img
          src={user.profilePic || "defaultImg.png"}
          alt="profile"
          className="h-16 w-16 md:h-20 md:w-20 rounded-full border border-gray-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center text-center md:text-left">
        <div className="text-base md:text-lg font-semibold">{`MyStatus (${user.name})`}</div>
        <div className="text-sm md:text-base text-gray-500">{`Click here for more info (${formattedTime})`}</div>
      </div>
    </div>
  );
}

export default MyStatus;
