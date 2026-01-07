import React from 'react';

const RightPart = () => {

  const handleDownload = () => {
    alert('Downloading WhatsApp for Windows...');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full p-6 bg-white shadow-md">
      <img 
        src="RightImg.png" 
        alt="WhatsApp Download" 
        className="w-full max-w-sm mb-4"
      />

      <h2 className="text-lg font-medium text-gray-800 mb-2">
        Download WhatsApp for Windows
      </h2>

      <p className="text-gray-600 text-center mb-4">
        Make calls, share your screen and get a faster experience when you download the Windows app.
      </p>

      <button 
        onClick={handleDownload} 
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg text-base mb-4"
      >
        Download
      </button>

      <p className="text-gray-500 text-sm flex items-center gap-1">
        <span role="img" aria-label="lock">🔒</span>
        Your personal messages are end-to-end encrypted
      </p>
    </div>
  );
};

export default RightPart;
