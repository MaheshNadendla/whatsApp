import React, { useState, useEffect, useContext } from "react";
import Left from "../components/HomePage/Left";
import Middle from "../components/HomePage/Middle";
import Right from "../components/HomePage/Right";
import { ContextDef } from "../components/HomePage/contextDef";

function HomePage() {
  const [showLeft, setShowLeft] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const {screen, setScreen,rightPartActive ,setRightPartActive} = useContext(ContextDef); // "mobile", "tablet", "desktop"

  // Detect screen size
 

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">

      {/* Hamburger for tablet/mobile */}

      {(screen === "mobile") && (rightPartActive) && (
        <button
          className="absolute top-4 right-4 z-50 text-2xl p-2 bg-white rounded shadow"
          onClick={() => { setRightPartActive(false) }}
        >
          {"↩"}
        </button>
      )}


      {(screen === "mobile" || screen === "tablet") && (
        <button
          className="absolute top-4 left-4 z-50 text-2xl p-2 bg-white rounded shadow"
          onClick={() => setShowLeft(!showLeft)}
        >
          {showLeft ? "✖" : "☰"}
        </button>
      )}

      {/* Left Sidebar */}
      {(screen === "desktop" || (showLeft && (screen === "mobile" || screen === "tablet"))) && (
        <div
          className={`bg-white border-r shadow-lg ${
            screen === "desktop"
              ? "flex flex-col w-[5%]"
              : "fixed top-0 left-0 h-full w-16 md:w-20 transform transition-transform duration-300 z-40"
          }`}
          style={{
            transform:
              showLeft || screen === "desktop" ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <Left />
        </div>
      )}

      {/* Middle */}
      <div
        className={`h-full overflow-auto ${
          screen === "desktop"
            ? "flex-1"
            : screen === "tablet"
            ? "w-1/2"
            : "w-full"
        }`}
      >
        { (rightPartActive && screen==="mobile") ?  <Right /> : <Middle /> }

      </div>

      {/* Right Sidebar */}
      {(screen === "tablet" || screen === "desktop")   && (
        <div className={`flex flex-col  ${screen==="desktop" ?  "w-[55%]" : "w-[50%]"} h-full bg-[#f0f2f5] overflow-auto`}>
          <Right />
        </div>
      )}
    </div>
  );
}

export default HomePage;
