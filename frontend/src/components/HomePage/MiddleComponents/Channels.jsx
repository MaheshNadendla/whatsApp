import React, { useContext } from "react";
// import "./Channels.css";
import { ContextDef } from "../contextDef";

const channels = [
  {
    name: "Learn English | IELTS | Grammar",
    followers: "74L followers",
    image: "channels.jpg",
    bio: "Improve your English grammar, speaking, and IELTS prep.",
    followed: false,
  },
  {
    name: "PWR X FF",
    followers: "28T followers",
    image: "channels.jpg",
    bio: "Gaming, fun, and esports strategies.",
    followed: false,
  },
  {
    name: "LUCENT GK GS NCERT SSC GD GD GK T...",
    followers: "18.5L followers",
    image: "channels.jpg",
    bio: "Crack SSC, GD exams with Lucent, NCERT & GK tricks.",
    followed: false,
  },
  {
    name: "Learn English Speaking & Communication...",
    followers: "26T followers",
    image: "channels.jpg",
    bio: "Boost your English communication and confidence.",
    followed: false,
  },
  {
    name: "IT Job Openings and Referrals",
    followers: "14T followers",
    image: "channels.jpg",
    bio: "Daily job posts and employee referrals for IT roles.",
    followed: false,
  },
  {
    name: "Logical Reasoning Tricks",
    followers: "23L followers",
    image: "channels.jpg",
    bio: "Ace your logical reasoning exams with proven tricks.",
    followed: false,
  },
  {
    name: "General Knowledge | UPSC & SSC",
    followers: "45L followers",
    image: "channels.jpg",
    bio: "Stay updated for UPSC and SSC exams with GK capsules.",
    followed: false,
  },
  {
    name: "Learn English | IELTS | Grammar",
    followers: "74L followers",
    image: "channels.jpg",
    bio: "Improve your English grammar, speaking, and IELTS prep.",
    followed: false,
  },
  {
    name: "PWR X FF",
    followers: "28T followers",
    image: "channels.jpg",
    bio: "Gaming, fun, and esports strategies.",
    followed: false,
  },
  {
    name: "LUCENT GK GS NCERT SSC GD GD GK T...",
    followers: "18.5L followers",
    image: "channels.jpg",
    bio: "Crack SSC, GD exams with Lucent, NCERT & GK tricks.",
    followed: false,
  },
  {
    name: "Learn English Speaking & Communication...",
    followers: "26T followers",
    image: "channels.jpg",
    bio: "Boost your English communication and confidence.",
    followed: false,
  },
  {
    name: "IT Job Openings and Referrals",
    followers: "14T followers",
    image: "channels.jpg",
    bio: "Daily job posts and employee referrals for IT roles.",
    followed: false,
  },
  {
    name: "Logical Reasoning Tricks",
    followers: "23L followers",
    image: "channels.jpg",
    bio: "Ace your logical reasoning exams with proven tricks.",
    followed: false,
  },
  {
    name: "General Knowledge | UPSC & SSC",
    followers: "45L followers",
    image: "channels.jpg",
    bio: "Stay updated for UPSC and SSC exams with GK capsules.",
    followed: false,
  }
];


const ChannelsList = () => {

  const {setHomeRightPageChannel,homeRightPageChannel,rightPartActive ,setRightPartActive} = useContext(ContextDef);

  return (
    <div className="channels-container w-full h-[100vh] bg-white overflow-hidden font-['Segoe_UI']">
  {/* Header */}
  <div className="channels-header flex justify-between items-center px-4 sm:px-6 md:px-8 pt-6">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Channels</h2>
    <button className="add-btn text-3xl bg-transparent border-none cursor-pointer">＋</button>
  </div>

  {/* Subtext */}
  <p className="subtext text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 my-2">
    Stay updated on your favorite topics
  </p>
  <p className="description text-base sm:text-lg md:text-xl text-gray-500 mb-5 px-4 sm:px-6 md:px-8">
    Find channels to follow below
  </p>

  {/* Channels list */}
  <div className="channels-scroll h-[70dvh] w-full overflow-y-auto pr-2">
    {channels.map((channel, index) => (
      <div
        key={index}
        onClick={() =>{ setHomeRightPageChannel(channel) ; setRightPartActive(true)}}
        className={`flex items-center justify-between rounded-xl border border-gray-200 cursor-pointer transition 
          mx-1 sm:mx-2 md:mx-3 lg:mx-3 my-2 px-2 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3
          ${channel === homeRightPageChannel ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
        `}
      >
        {/* Channel Image */}
        <img
          src={channel.image}
          alt={channel.name}
          className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] lg:w-[80px] lg:h-[80px] rounded-full object-cover"
        />

        {/* Channel Info */}
        <div className="flex flex-col ml-3 sm:ml-4 md:ml-6 flex-1 min-w-0">
          <div className="text-sm sm:text-lg md:text-xl font-medium break-words">{channel.name}</div>
          <div className="text-xs sm:text-base md:text-lg text-gray-600 break-words" >{channel.followers}</div>
        </div>

        {/* Follow Button */}
        <button className="follow-btn border border-gray-300 rounded-full text-green-600 text-sm sm:text-base md:text-lg px-4 py-2 hover:scale-105 transition">
          Follow
        </button>
      </div>
    ))}
  </div>

  {/* Discover More */}
  <div className="Chny-Dis flex justify-center items-center mt-6">
    <button className="discover-btn bg-[#00a35c] text-white font-medium rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl w-[90%] hover:opacity-90 transition">
      Discover more
    </button>
  </div>
</div>


  );
};

export default ChannelsList;
