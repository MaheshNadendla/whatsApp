import React, { useContext, useState } from 'react';
// import './AIChat.css';
import { FaRobot, FaCode, FaImage, FaBrain, FaMusic, FaGlobe, FaPaintBrush, FaCamera, FaSearch, FaVideo, FaGamepad, FaBook, FaUserNinja, FaMapMarkedAlt, FaLaptopCode } from 'react-icons/fa';
import { ContextDef } from '../contextDef';

const aiOptions = [
  {
    name: "ChatGPT",
    Icon: FaRobot,
    description: "A conversational AI that answers questions and chats naturally."
  },
  {
    name: "Code AI",
    Icon: FaCode,
    description: "Auto-generates, refactors, and explains code snippets."
  },
  {
    name: "Image Generator",
    Icon: FaImage,
    description: "Creates custom images from your text prompts."
  },
  {
    name: "Smart Brain",
    Icon: FaBrain,
    description: "Analyzes complex data and provides insights."
  },
  {
    name: "Music Maker",
    Icon: FaMusic,
    description: "Composes original music tracks in various genres."
  },
  {
    name: "Travel Advisor",
    Icon: FaGlobe,
    description: "Recommends itineraries and local tips for any destination."
  },
  {
    name: "Art Creator",
    Icon: FaPaintBrush,
    description: "Generates unique digital artworks and illustrations."
  },
  {
    name: "Photo Enhancer",
    Icon: FaCamera,
    description: "Automatically improves image quality and clarity."
  },
  {
    name: "Web Search AI",
    Icon: FaSearch,
    description: "Fetches and summarizes the latest web search results."
  },
  {
    name: "Video Maker",
    Icon: FaVideo,
    description: "Turns scripts into polished video clips."
  },
  {
    name: "Game Bot",
    Icon: FaGamepad,
    description: "Interactive AI for playing and moderating games."
  },
  {
    name: "Book Summarizer",
    Icon: FaBook,
    description: "Condenses book contents into concise summaries."
  },
  {
    name: "Hacker AI",
    Icon: FaUserNinja,
    description: "Performs security testing and vulnerability scans."
  },
  {
    name: "Map Guide",
    Icon: FaMapMarkedAlt,
    description: "Provides turn-by-turn navigation and points of interest."
  },
  {
    name: "Coding Assistant",
    Icon: FaLaptopCode,
    description: "Helps you debug and optimize your programming projects."
  },
  {
    name: "Email Writer",
    Icon: FaBook,
    description: "Drafts professional emails based on your prompts."
  },
  {
    name: "Recipe Generator",
    Icon: FaBrain,
    description: "Suggests recipes tailored to your available ingredients."
  },
  {
    name: "Fitness Coach",
    Icon: FaUserNinja,
    description: "Creates personalized workout and nutrition plans."
  },
  {
    name: "News Reader",
    Icon: FaGlobe,
    description: "Fetches and summarizes current news articles."
  },
  {
    name: "Interview Bot",
    Icon: FaRobot,
    description: "Simulates common job interview questions and feedback."
  },
  {
    name: "Resume Builder",
    Icon: FaLaptopCode,
    description: "Generates polished, ATS-friendly resume layouts."
  },
  {
    name: "AI Designer",
    Icon: FaPaintBrush,
    description: "Creates mockups and graphic designs instantly."
  },
  {
    name: "Stock Predictor",
    Icon: FaSearch,
    description: "Forecasts stock market trends using historical data."
  },
  {
    name: "Language Tutor",
    Icon: FaBook,
    description: "Teaches vocabulary, grammar, and conversation skills."
  },
];






function AIChatPage() {

  const [input, setInput] = useState('');

  const filteredOptions = aiOptions.filter(option =>
  option.name.toLowerCase().includes(input.toLowerCase())
);


  const {AiRightPage, setAiRightPage,rightPartActive ,setRightPartActive}=useContext(ContextDef)

    return (
    <div className="max-w-[900px] mx-auto p-5 font-sans bg-white min-h-screen">
  {/* Input Box */}
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type your message here..."
    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg outline-none focus:border-[#25d366] mb-8"
  />

  {/* AI Grid */}
  <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-5">
    {filteredOptions.length > 0 ? (
      filteredOptions.map((option, index) => (
        <div
          key={index}
          onClick={() => {setAiRightPage(option); setRightPartActive(true)}}
          className="flex flex-col items-center justify-center border border-gray-300 rounded-xl py-6 text-center cursor-pointer bg-[#f9f9f9] transition hover:-translate-y-1 hover:shadow-lg"
        >
          <option.Icon className="text-[28px] mb-2 text-gray-800" />
          <span className="text-sm font-semibold text-gray-800">{option.name}</span>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500 text-lg">
        No users found.
      </div>
    )}
  </div>
</div>

  );
}

export default AIChatPage;
