"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, githubLink }),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Project uploaded successfully!");
        router.push("/"); 
        
        // Reset the form fields
        setTitle("");
        setDescription("");
        setGithubLink("");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1c1c] to-[#111] flex flex-col justify-center items-center text-white">
      <header className="w-full bg-transparent shadow-md px-8 py-6 flex justify-end items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/hamza.jpg"
            alt="Profile Picture"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#00BCD4] hover:scale-105 transition-transform duration-300"
          />
          <span className="font-semibold text-lg text-[#00BCD4]">Hamza</span>
        </div>
      </header>

      {/* Form Section */}
      <main className="w-full max-w-7xl mx-auto mt-10 bg-[#212121] p-16 rounded-lg shadow-2xl border-2 border-[#00BCD4]">
        <h1 className="text-3xl font-extrabold text-[#00BCD4] mb-8 text-center">Upload Project</h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Project Title */}
          <div>
            <label htmlFor="project-title" className="block text-gray-400 font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              id="project-title"
              name="project-title"
              className="w-full border-2 border-[#00BCD4] p-4 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] placeholder-[#B0BEC5] transition-all duration-300"
              placeholder="Enter project title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="project-description" className="block text-gray-400 font-medium mb-2">
              Project Description
            </label>
            <textarea
              id="project-description"
              name="project-description"
              rows="4"
              className="w-full border-2 border-[#00BCD4] p-4 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] placeholder-[#B0BEC5] transition-all duration-300"
              placeholder="Enter project description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* GitHub Link */}
          <div>
            <label htmlFor="github-link" className="block text-gray-400 font-medium mb-2">
              GitHub Repository Link
            </label>
            <input
              type="url"
              id="github-link"
              name="github-link"
              className="w-full border-2 border-[#00BCD4] p-4 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] placeholder-[#B0BEC5] transition-all duration-300"
              placeholder="Enter GitHub repository link"
              required
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#00BCD4] text-white px-8 py-4 rounded-lg hover:bg-[#0097A7] transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              Upload Project
            </button>
          </div>
        </form>

        {/* Message */}
        {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}
      </main>
    </div>
  );
}
