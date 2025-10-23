'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/admin");
      if (!response.ok) {
        throw new Error("Failed to fetch admin data");
      }

      const data = await response.json();
      const adminData = data.data;

      const isAuthenticated = adminData.some(
        (admin) => admin.user === username && admin.pass === password
      );

      if (isAuthenticated) {
        
        router.push("/"); 
      } else {
        setError("Incorrect username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/planet.jpg')" }}
    >
      <div className="w-full max-w-md bg-transparent border-2 border-white/20 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-white font-semibold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Username Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/20 rounded-full outline-none placeholder-white/70 focus:border-white"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-white bg-transparent border-2 border-white/20 rounded-full outline-none placeholder-white/70 focus:border-white"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 text-purple-600 bg-white font-semibold rounded-full hover:bg-white/90 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
