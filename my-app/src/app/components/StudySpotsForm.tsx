'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSession } from "next-auth/react";

interface FormData {
  email: string;
  location: string;
  seatAvailability: number;
  amenities: number;
  quietness: number;
  cleanliness: number;
  comfort: number;
  comments: string;
}

// Navigation items data
const navigationItems: NavItem[] = [
  { id: "campus", label: "UGA Campus", path: "https://www.uga.edu" },
  { id: "map", label: "Map & Directions", path: "https://www.google.com/maps/search/uga+campus+map/@33.9181276,-83.4104864,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D/" },
  { id: "mail", label: "UGAMail", path: "https://outlook.office.com/mail/" },
  { id: "elc", label: "eLC", path: "https://uga.view.usg.edu" }
];

// Header Component
const Header: React.FC<HeaderProps> = ({ onSearch, onLogin, onSignUp }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const router = useRouter();
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string): void => {
    setSearchTerm(value);
    onSearch(value);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="p-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => router.push('/pages/Dashboard')}
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
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search"
              className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Sign Out
            </button>
            
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
                      router.push('/pages/create-bolton-rating');
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                  >
                    Dining Hall
                  </button>
                  <button
                    onClick={() => {
                      router.push('/pages/create-study-rating');
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                  >
                    Study Spots
                  </button>
                  <button
                    onClick={() => {
                      router.push('/pages/create-restaurant-rating');
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition"
                  >
                    Restaurants
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => router.push('/pages/user-data-page')}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              User Data
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Navigation Component
const Navigation: React.FC<NavigationProps> = ({ items, onNavClick }) => (
  <nav className="bg-gray-100 p-4">
    <div className="max-w-7xl mx-auto flex justify-between">
      {items.map(({ id, label, path }) => (
        <button
          key={id}
          onClick={() => window.open(path, '_blank', 'noopener,noreferrer')}
          className="px-6 py-2 rounded-full bg-white hover:bg-gray-50 transition"
        >
          {label}
        </button>
      ))}
    </div>
  </nav>
);

// Main Form Component
export default function StudySpotForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    location: '',
    seatAvailability: 5,
    amenities: 5,
    quietness: 5,
    cleanliness: 5,
    comfort: 5,
    comments: '',
  });

  const studySpots = [
    'Select Study Spot',
    'Main-Library',
    'Science-Library',
    'Law-Library',
    'Miller-Learning-Center',
    'Tate-Student-Center',
    'Science-Learning-Center'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['seatAvailability', 'amenities', 'quietness', 'cleanliness', 'comfort'].includes(name)
        ? Math.min(10, Math.max(0, Number(value)))
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Get the user session
      const session = await getSession();
      const user = session?.user;
      const email = user?.email;
  
      if (!email) {
        console.error("User email not found");
        return;
      }
  
      // Update the email field in formData
      setFormData((prev) => ({
        ...prev,
        email, // Dynamically set the email field
      }));
  
      console.log("Submitted data:", { ...formData, email }); // Ensure email is included
  
      // Example POST request
      const res = await fetch("/api/rankings/poststudy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          email, // Ensure email is sent in the request body
        }),
      });
  
      if (res.ok) {
        console.log("Form submitted successfully");
        router.push("/pages/Dashboard");
      } else {
        console.error("Form submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleSearch = (term: string) => {
    console.log('Search term:', term);
    // Implement search functionality
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  const handleNavigation = (path: string) => {
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
      <Navigation 
        items={navigationItems}
        onNavClick={handleNavigation}
      />
      
      <div className="w-full max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-4">
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {studySpots.map(spot => (
                <option key={spot} value={spot === 'Select Study Spot' ? '' : spot}>
                  {spot}
                </option>
              ))}
            </select>

            {['seatAvailability', 'amenities', 'quietness', 'cleanliness', 'comfort'].map(field => (
              <div key={field} className="flex items-center space-x-4">
                <label className="w-32 font-medium capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type="range"
                  name={field}
                  min="0"
                  max="10"
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                  className="flex-grow"
                />
                <div className="w-12 h-8 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                  {formData[field as keyof FormData]}
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <label className="block font-medium">
                Comments:
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Great place to study!"
                className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}