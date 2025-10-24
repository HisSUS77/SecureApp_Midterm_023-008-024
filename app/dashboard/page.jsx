"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Announcements from "../components/Announcements";
import Trending from "../components/Trending";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]); // State to store projects
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects"); // Adjust the endpoint if necessary
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects);
        } else {
          console.error("Failed to fetch projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle project deletion
  const handleDelete = (deletedProjectId) => {
    setProjects(projects.filter((project) => project._id !== deletedProjectId));
  };

  // Handle project update
  const handleUpdate = (updatedProjectId, updatedTitle, updatedDescription) => {
    setProjects(
      projects.map((project) =>
        project._id === updatedProjectId
          ? { ...project, title: updatedTitle, description: updatedDescription }
          : project
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="lg:w-[250px] w-full bg-gradient-to-b from-teal-500 to-blue-600 text-white fixed top-0 left-0 h-full shadow-2xl z-10">
        <Sidebar />
      </div>

      <div className="flex-1 ml-[250px] bg-gray-100">
        <Header />
        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Projects</h2>
            {loading ? (
              <div className="animate-pulse">
                <p>Loading projects...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="space-y-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    title={project.title}
                    description={project.description}
                    projectId={project._id}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No projects found.</p>
            )}
          </div>

          <div className="space-y-8 lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Announcements />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <Trending />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}