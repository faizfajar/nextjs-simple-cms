"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <Navbar>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow text-center space-y-4">
        <h1 className="text-2xl font-bold">Selamat Datang di CMS App</h1>
        <p className="text-gray-600">
          Halo, <strong>{user?.username}</strong>
        </p>

        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </Navbar>
  );
}
