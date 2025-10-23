'use client';

import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

export default function Sidebar() {
  const router = useRouter(); // Instantiate the router

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.push('/home'); // Navigate to the specified path
  };

  return (
    <aside className="bg-gradient-to-b from-teal-500 to-blue-600 text-white w-[250px] h-screen fixed shadow-2xl z-10">
      <h1 className="text-4xl font-extrabold p-8 text-center drop-shadow-lg">Dashboard</h1>
      <ul className="space-y-6 text-lg px-8">
        {["Home", "Profile", "Messages", "Tasks", "Communities", "Settings", "Support", "Privacy"].map((item) => (
          <li 
            key={item} 
            className="hover:text-gray-200 cursor-pointer transition duration-200"
            onClick={() => handleNavigation(item.toLowerCase())} // Call handleNavigation with the lowercase name
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
