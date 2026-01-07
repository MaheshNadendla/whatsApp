import React, { useContext } from "react";

import { ContextDef } from "../contextDef";

const communities = [
  {
    name: "Web Developers Hub",
    followers: "42L followers",
    image: "channels.jpg",
    bio: "A space for modern frontend & backend discussions.",
    followed: false,
  },
  {
    name: "AI & ML Enthusiasts",
    followers: "31T followers",
    image: "channels.jpg",
    bio: "Learn, share, and innovate in the world of AI.",
    followed: false,
  },
  {
    name: "UI/UX Design Corner",
    followers: "20L followers",
    image: "channels.jpg",
    bio: "Where aesthetics meet usability.",
    followed: false,
  },
  {
    name: "Freelance & Remote Jobs",
    followers: "38T followers",
    image: "channels.jpg",
    bio: "Your go-to place for job leads and gig sharing.",
    followed: false,
  },
  {
    name: "Competitive Programming",
    followers: "15L followers",
    image: "channels.jpg",
    bio: "Sharpen your coding skills with daily challenges.",
    followed: false,
  },
  {
    name: "JavaScript Masters",
    followers: "28L followers",
    image: "channels.jpg",
    bio: "Master JS with top developers around the world.",
    followed: false,
  },
  {
    name: "Cloud & DevOps",
    followers: "19T followers",
    image: "channels.jpg",
    bio: "Explore cloud computing, automation, and CI/CD.",
    followed: false,
  },
  {
    name: "Freelance & Remote Jobs",
    followers: "38T followers",
    image: "channels.jpg",
    bio: "Your go-to place for job leads and gig sharing.",
    followed: false,
  },
  {
    name: "Competitive Programming",
    followers: "15L followers",
    image: "channels.jpg",
    bio: "Sharpen your coding skills with daily challenges.",
    followed: false,
  },
  {
    name: "JavaScript Masters",
    followers: "28L followers",
    image: "channels.jpg",
    bio: "Master JS with top developers around the world.",
    followed: false,
  },
  {
    name: "Cloud & DevOps",
    followers: "19T followers",
    image: "channels.jpg",
    bio: "Explore cloud computing, automation, and CI/CD.",
    followed: false,
  },
];


const CommunityList = () => {

  const{setHomeRightPage,homeRightPage,rightPartActive ,setRightPartActive} = useContext(ContextDef);

  return (
    <div className="community-container w-full h-[100vh] bg-white overflow-hidden font-['Segoe_UI']">
  {/* Header */}
  <div className="community-header flex justify-between items-center px-4 sm:px-6 md:px-8 pt-6">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Community</h2>
    <button className="community-add-btn text-3xl bg-transparent border-none cursor-pointer">＋</button>
  </div>

  {/* Subtext */}
  <p className="community-subtext text-lg sm:text-xl md:text-2xl px-4 sm:px-6 md:px-8 my-2">
    Join communities that match your interests
  </p>
  <p className="community-description text-base sm:text-lg md:text-xl text-gray-500 mb-5 px-4 sm:px-6 md:px-8">
    Explore and follow communities below
  </p>

  {/* Community list */}
  <div className="community-scroll h-[70dvh] w-full overflow-y-auto pr-2">
    {communities.map((community, index) => (
      <div
        key={index}
        onClick={() =>{setHomeRightPage(community);setRightPartActive(true)}}
        className={`flex items-center justify-between rounded-xl border border-gray-200 cursor-pointer transition 
          mx-1 sm:mx-2 md:mx-3 lg:mx-3 my-2 px-2 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3
          ${community === homeRightPage ? "bg-gray-100" : "bg-white hover:bg-gray-100"}
        `}
      >
        {/* Community Image */}
        <img
          src={community.image}
          alt={community.name}
          className="w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] md:w-[75px] md:h-[75px] lg:w-[80px] lg:h-[80px] rounded-full object-cover"
        />

        {/* Community Info */}
        <div className="flex flex-col ml-3 sm:ml-4 md:ml-6 flex-1 min-w-0">
          <div className="text-sm sm:text-lg md:text-xl font-medium break-words">{community.name}</div>
          <div className="text-xs sm:text-base md:text-lg text-gray-600 break-words">{community.followers}</div>
        </div>

        {/* Follow Button */}
        <button className="border border-gray-300 rounded-full text-green-600 text-sm sm:text-base md:text-lg px-4 py-2 hover:scale-105 transition">
          Follow
        </button>
      </div>
    ))}
  </div>

  {/* Discover More */}
  <div className="Cmty-Dis flex justify-center items-center mt-6">
    <button className="community-discover-btn bg-[#00a35c] text-white font-medium rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl w-[90%] hover:opacity-90 transition">
      Discover more
    </button>
  </div>
</div>

  );
};

export default CommunityList;
