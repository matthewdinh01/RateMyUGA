'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSession } from "next-auth/react";

// Form interface
interface FormData {
  email: string;
  location: string;
  foodQuality: number;
  foodVariety: number;
  service: number;
  cleanliness: number;
  comments: string;
}


// Main Form Component
export default function DiningHallForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    location: '',
    foodQuality: 5,
    foodVariety: 5,
    service: 5,
    cleanliness: 5,
    comments: '',
  });

  const diningHalls = [
    'Select Dining Hall',
    'Bolton-Dining-Hall',
    'Snelling-Dining-Hall',
    'O-House-Dining-Hall',
    'Village-Summit',
    'The-Niche'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['foodQuality', 'foodVariety', 'service', 'cleanliness'].includes(name)
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
        const res = await fetch("/api/rankings/postdining", {
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

  

  return (
    <div className="min-h-screen bg-gray-50">
      
      
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
              {diningHalls.map(hall => (
                <option key={hall} value={hall === 'Select Dining Hall' ? '' : hall}>
                  {hall}
                </option>
              ))}
            </select>

          {['foodQuality', 'foodVariety', 'service', 'cleanliness'].map(field => (
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
                placeholder="Fantastic!"
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