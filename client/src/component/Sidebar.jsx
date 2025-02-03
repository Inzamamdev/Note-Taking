import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ userData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-full 0 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="/home" className="text-white hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/favourites" className="text-white hover:text-gray-400">
              Favourites
            </a>
          </li>
        </ul>
      </div>

      {/* Bottom Section: Username and Logout */}
      <div className="mt-auto">
        <div className="text-white mb-4">
          <p>{userData}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
