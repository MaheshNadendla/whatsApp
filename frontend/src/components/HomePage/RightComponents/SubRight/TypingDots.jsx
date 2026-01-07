
import React from 'react';
import './TypingDots.css';

const TypingDots = () => {
  return (
    <div className="typing-indicator">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
};

export default TypingDots;


// import React from 'react';

// const TypingDots = () => {
//   const dots = [0, 1, 2];

//   return (
//     <div className="flex items-center justify-center gap-1.5 h-10 w-18 px-4 py-3 rounded-[10px_16px_16px_10px] bg-green-100 border border-black/15 ml-2 mb-2">
//       {dots.map((dot, idx) => (
//         <span
//           key={idx}
//           className="w-2 h-2 bg-black rounded-full"
//           style={{
//             animation: 'bounce 1.4s infinite ease-in-out',
//             animationDelay: `${idx * 0.2}s`,
//           }}
//         ></span>
//       ))}
//       <style>
//         {`
//           @keyframes bounce {
//             0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
//             40% { transform: translateY(-8px); opacity: 1; }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TypingDots;
