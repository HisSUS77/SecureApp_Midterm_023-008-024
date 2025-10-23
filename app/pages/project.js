"use client";

import { useState } from "react";

export default function Projects() {
  const [message, setMessage] = useState("");

  // Helper function to send requests
  const sendRequest = async (method, body = null) => {
    const response = await fetch("/api/projects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
    const result = await response.json();
    setMessage(JSON.stringify(result, null, 2));
  };

  return (
    <div>
      <h1>CRUD Operations Test</h1>
      <button onClick={() => sendRequest("POST", { title: "New Project", description: "Test project", githubLink: "https://github.com/test" })}>
        Create Project
      </button>
      <button onClick={() => sendRequest("GET")}>Get All Projects</button>
      <button onClick={() => sendRequest("PUT", { id: "67685a2a63ac173480566c65", title: "Updated Project", description: "Updated description" })}>
        Update Project
      </button>
      <button onClick={() => sendRequest("DELETE", { id: "67685a2a63ac173480566c65" })}>
        Delete Project
      </button>
      <pre>{message}</pre>
    </div>
  );
}
