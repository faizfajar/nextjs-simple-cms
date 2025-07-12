"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

export default function Navbar({ children }: { children: ReactNode }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <>
      <nav className="bg-white text-gray-900 px-4 py-3 flex items-center justify-between border-b shadow-sm relative">
        <Link href="/" className="text-lg font-semibold">
          CMS App
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/home" className="hover:underline">
            Home
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="hover:underline focus:outline-none"
            >
              Settings
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow z-10 border">
                <Link
                  href="/settings/group_menu"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Group Menu
                </Link>
                <Link
                  href="/settings/menu"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Menu
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="p-4 bg-white min-h-screen text-gray-800">
        {children}
      </main>
    </>
  );
}
