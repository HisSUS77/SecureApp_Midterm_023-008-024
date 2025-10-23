import { RiEdit2Fill, RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";

export default function ProjectCard({ title, description, onEdit, onDelete, projectId, onUpdate }) {
  const [isDeleting, setIsDeleting] = useState(false); // Manage the loading state
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [editTitle, setEditTitle] = useState(title); // State for title input
  const [editDescription, setEditDescription] = useState(description); // State for description input

  // Function to handle the deletion of the project
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        const response = await fetch("/api/projects", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      });
  
      const data = await response.json();
      if (data.success) {
        onDelete(projectId); // Call the onDelete callback to remove the project from the UI
      } else {
        alert("Error deleting project: " + data.error);
      }
    } catch (error) {
      alert("Error deleting project: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  

  // Function to handle the update of the project
  const handleUpdate = async () => {
    if (!editTitle || !editDescription) {
      alert("Please provide both title and description.");
      return;
    }

    try {
      const response = await fetch("/api/projects", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId, title: editTitle, description: editDescription }),
      });

      const data = await response.json();
      if (data.success) {
        onUpdate(projectId, editTitle, editDescription); // Call onUpdate callback to update the project in the UI
        setIsEditing(false); // Close the edit form
      } else {
        alert("Error updating project: " + data.error);
      }
    } catch (error) {
      alert("Error updating project: " + error.message);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:scale-105 hover:rotate-2">
      {/* Buttons for Edit and Delete */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => setIsEditing(!isEditing)} // Toggle the edit form
          className="bg-white hover:bg-indigo-100 text-indigo-600 text-sm p-3 rounded-full shadow-lg transition duration-200 flex items-center justify-center w-10 h-10"
          title="Edit"
        >
          <RiEdit2Fill size={20} />
        </button>
        <button
          onClick={handleDelete}
          className="bg-white hover:bg-red-100 text-red-600 text-sm p-3 rounded-full shadow-lg transition duration-200 flex items-center justify-center w-10 h-10"
          title="Delete"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : <RiDeleteBin6Fill size={20} />}
        </button>
      </div>

      {/* Edit Form (if editing) */}
      {isEditing ? (
        <div className="mt-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 text-black"  // Added text-black class here
            placeholder="Edit project title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 mb-2 rounded-lg border border-gray-300 text-black"  // Added text-black class here
            placeholder="Edit project description"
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2 rounded-lg w-full mt-2"
          >
            Update Project
          </button>
        </div>
      ) : (
        <div>
          {/* Title and Description */}
          <h3 className="text-3xl font-extrabold text-white drop-shadow-md">{title}</h3>
          <p className="text-white mt-2 text-sm opacity-80">{description}</p>
        </div>
      )}
    </div>
  );
}
 