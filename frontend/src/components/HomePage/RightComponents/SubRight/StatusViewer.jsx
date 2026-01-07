import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { ContextDef } from '../../contextDef';
import BtnLoader from '../../../utils/BtnLoader';

const StatusViewer = () => {
  const { selectedUserStatus, setSelectedUserStatus } = useContext(ContextDef);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!selectedUserStatus || selectedUserStatus.length === 0) {
    return <div className="text-gray-600 text-center py-16 text-lg">No status available</div>;
  }

  const handlePrev = () => {
    setIsLoading(true);
    setCurrentIndex(prev => {
      if (prev <= 0) {
        setSelectedUserStatus(null);
        return 0;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentIndex(prev => {
      if (prev >= selectedUserStatus.length - 1) {
        setSelectedUserStatus(null);
        return prev;
      }
      return prev + 1;
    });
  };

  const handleClose = () => {
    setSelectedUserStatus(null);
  };

  const currentStatus = selectedUserStatus[currentIndex];

  return (
    <div className="flex flex-col h-full w-full p-4 bg-gray-100">
  
  {/* Part 1: Top - Header / Close */}
  <div className="flex justify-end mb-2">
    <button
      onClick={handleClose}
      className="text-gray-800 text-xl hover:text-red-500"
    >
      <FaTimes />
    </button>
  </div>

  {/* Part 2 & 3: Middle - Status content & Progress */}
  <div className="flex flex-1 flex-col gap-4 justify-center items-center">
    
    {/* Part 2: Progress / Info */}
    <div className="flex flex-col justify-start gap-2 w-full">
      <div className="flex gap-1">
        {selectedUserStatus.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-1 rounded ${idx === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>

    {/* Part 3: Image / Video */}
    <div className="flex-1 flex justify-center items-center">
      <div className="relative w-full max-w-md max-h-[500px] flex justify-center items-center">
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <BtnLoader />
          </div>
        )}
        <img
          src={currentStatus?.videoUrl}
          alt="status"
          onLoad={() => setIsLoading(false)}
          className="w-full h-auto object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>

  {/* Part 4: Bottom - Navigation */}
  <div className="flex justify-between mt-4 px-2">
    <button
      onClick={handlePrev}
      className="text-2xl bg-gray-200 hover:bg-green-400 text-gray-700 p-2 rounded-full shadow-md"
    >
      <FaArrowLeft />
    </button>
    <button
      onClick={handleNext}
      className="text-2xl bg-gray-200 hover:bg-green-400 text-gray-700 p-2 rounded-full shadow-md"
    >
      <FaArrowRight />
    </button>
  </div>

</div>

  );
};

export default StatusViewer;
