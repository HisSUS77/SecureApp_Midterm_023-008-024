'use client';

import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13 App Directory

export default function Header() {
  const router = useRouter(); // useRouter from next/navigation
  
  const handleUploadClick = () => {
    router.push('/upload'); // Navigate to the upload page
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 shadow-2xl rounded-b-2xl sticky top-0 z-20">
      {/* Left: Search Bar */}
      <div className="flex items-center space-x-4">
        <FiSearch className="text-gray-100 text-2xl transition transform hover:text-white" />
        <input
          type="text"
          placeholder="Search"
          className="w-[400px] px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-gray-300 text-lg transition-all duration-300 ease-in-out hover:bg-gray-200"
        />
      </div>

      {/* Center: Action Buttons */}
      <div className="flex space-x-6">
        <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-600 transition duration-300 ease-in-out">
          New
        </button>
        <button
          onClick={handleUploadClick}
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          Upload
        </button>
        <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-full hover:bg-gradient-to-l hover:from-teal-500 hover:to-blue-600 transition duration-300 ease-in-out">
          Share
        </button>
      </div>

      {/* Right: Profile Section */}
      <div className="flex items-center space-x-4">
        <img
          src="/hamza.jpg"
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover transform transition-all duration-300 hover:scale-110"
        />
        <p className="font-semibold text-lg text-white">{`Hamza`}</p>
      </div>
    </header>
  );
}
