'use client';

import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
        <div className="text-xl font-extrabold">FutureTech</div>
        <div className="space-x-6">
          <a href="#about" className="hover:text-pink-500">About</a>
          <a href="#services" className="hover:text-pink-500">Services</a>
          <a href="#contact" className="hover:text-pink-500">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight tracking-wide animate__animated animate__fadeIn animate__delay-1s">
          Welcome to the Future of Technology
        </h1>
        <p className="text-lg sm:text-2xl opacity-80 animate__animated animate__fadeIn animate__delay-2s">
          Innovating solutions for a better tomorrow. Experience the cutting-edge of digital transformation.
        </p>
        <button
          onClick={handleOpenModal}
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l text-black px-8 py-3 rounded-full transition duration-300 transform hover:scale-110"
        >
          Explore Now
        </button>

        {/* Scroll Down Arrow */}
        <div className="animate-bounce mt-12">
          <FaArrowDown size={30} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-extrabold">About Us</h2>
          <p className="text-lg opacity-80">
            We are a forward-thinking tech company shaping the future with innovative products, services, and experiences. Our team is driven by the passion to create a more connected, efficient, and sustainable world through technology.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-extrabold">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-8 rounded-3xl hover:scale-105 transition transform">
              <h3 className="text-2xl font-semibold">AI Solutions</h3>
              <p className="opacity-80">Leverage artificial intelligence to solve complex problems and unlock new opportunities for your business.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl hover:scale-105 transition transform">
              <h3 className="text-2xl font-semibold">Blockchain Tech</h3>
              <p className="opacity-80">Harness the power of decentralized technology to enhance security, transparency, and efficiency.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl hover:scale-105 transition transform">
              <h3 className="text-2xl font-semibold">Cloud Computing</h3>
              <p className="opacity-80">Scale your infrastructure on-demand and optimize your workflow with our secure cloud solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-extrabold">Contact Us</h2>
          <p className="text-lg opacity-80">
            Get in touch with us today to see how we can help your business grow with cutting-edge technology solutions.
          </p>
          <button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l text-white px-8 py-3 rounded-full transition duration-300 transform hover:scale-110">
            Contact Us
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-xl shadow-2xl w-96">
            <h3 className="text-xl font-bold mb-4 text-black">Thank you for exploring!</h3>
            <p className="mb-6 text-black">We are excited to show you the future of technology. Please stay tuned for more updates.</p>
            <button onClick={handleCloseModal} className="bg-blue-500 text-black px-6 py-2 rounded-full hover:bg-blue-600 transition">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
