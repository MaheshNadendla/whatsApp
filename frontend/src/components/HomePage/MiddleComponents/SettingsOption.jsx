import React from "react";

const SettingsOption = ({ icon, title, description }) => {
  return (
    <div className="flex items-center gap-6 cursor-pointer p-4 rounded-xl transition-transform transition-colors duration-200 hover:bg-gray-100 hover:scale-102">
      {/* Icon */}
      <div className="text-2xl text-gray-600">{icon}</div>

      {/* Text */}
      <div className="flex flex-col">
        <h4 className="text-xl font-medium">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default SettingsOption;
