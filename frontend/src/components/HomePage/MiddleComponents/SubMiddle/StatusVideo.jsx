import React, { useContext } from 'react';
import { ContextDef } from '../../contextDef';

function StatusVideo({ status }) {
  const { selectedUserStatus, setSelectedUserStatus } = useContext(ContextDef);

  const lastStatus = status.statuses[status.statuses.length - 1];
  const formattedTime = new Date(lastStatus.createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Generate conic-gradient for ring
  const segments = status.statuses.length;
  const segmentAngle = 360 / segments;
  let conicGradient = '';
  for (let i = 0; i < segments; i++) {
    const start = i * segmentAngle;
    const end = start + segmentAngle - 1;
    conicGradient += `blue ${start}deg ${end}deg, transparent ${end}deg ${start + segmentAngle}deg, `;
  }
  conicGradient = `conic-gradient(${conicGradient.slice(0, -2)})`;

  return (
    <div
      className="flex flex-col bg-white w-full p-2 md:p-4 rounded-lg cursor-pointer"
      onClick={() => setSelectedUserStatus(status.statuses)}
    >
      {/* Line */}
      <div className="flex w-full h-px bg-transparent mb-3">
        <div className="w-1/6 h-px"></div>
        <div className="w-5/6 h-px bg-gray-300 rounded-full"></div>
      </div>

      {/* Status Content */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Profile Photo + Ring */}
        <div
          className="flex items-center justify-center rounded-full p-[2px]"
          style={{ background: conicGradient }}
        >
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border border-blue-500">
            <img
              src={status.user.profilePic || 'defaultImg.png'}
              alt="profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="text-base md:text-lg font-semibold">{status.user.name}</div>
          <div className="text-sm md:text-base text-gray-500">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

export default StatusVideo;
