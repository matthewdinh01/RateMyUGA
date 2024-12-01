"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { doLogout } from "@/app/actions"; // Replace with your logout logic
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

const NavigationBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulate user login state
  useEffect(() => {
    // Replace this with actual authentication logic
    const checkLoginStatus = async () => {
      // Example: Check user login status from a session or API
      const session = await getSession();
      const user = session?.user;
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <button
          onClick={() => router.push("/pages/Dashboard")}
          className="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <img
            src="../../../uga-logo.png"
            alt="UGA Logo"
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">RateMyUGA</h1>
          <p className="#BA0C2F">University of Georgia</p>
        </button>

        {/* Search Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          {/* Conditional Buttons */}
          <div className="flex space-x-2">
            {!isLoggedIn ? (
              <>
                {/* Login and Sign Up */}
                <button
                  onClick={() => router.push("/pages/login")}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/pages/register")}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Sign Out */}
                <button
                  onClick={() => doLogout()}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Out
                </button>

                {/* Submit New Rank */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Submit New Rank
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50">
                      <button
                        onClick={() => {
                          router.push("/pages/create-dininghall-rating");
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Dining Hall
                      </button>
                      <button
                        onClick={() => {
                          router.push("/pages/create-study-rating");
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Study Spots
                      </button>
                      <button
                        onClick={() => {
                          router.push("/pages/create-restaurant-rating");
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                      >
                        Restaurants
                      </button>
                    </div>
                  )}
                </div>

                {/* User Data */}
                <button
                  onClick={() => router.push("/pages/user-data-page")}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  My Rankings
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;