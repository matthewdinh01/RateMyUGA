'use client'
import React, { useState } from 'react';
import styles from './BoltonForm.module.css';
import { useRouter } from 'next/navigation';

interface FormData {
  diningHall: string;
  foodQuality: number;
  variety: number;
  service: number;
  cleanliness: number;
  comments: string;
}

export default function DiningHallForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    diningHall: '',
    foodQuality: 5,
    variety: 5,
    service: 5,
    cleanliness: 5,
    comments: '',
  });

  const diningHalls = [
    'Select Dining Hall',
    'Bolton Dining Hall',
    'Snelling Dining Hall',
    'O-House Dining Hall',
    'Village Summit',
    'The Niche'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['foodQuality', 'cleanliness', 'variety', 'service'].includes(name)
        ? Math.min(10, Math.max(0, Number(value)))
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // Add your submission logic here
    router.push('/pages/Dashboard');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-4">
          <select
            name="diningHall"
            value={formData.diningHall}
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

          {['foodQuality', 'variety', 'service', 'cleanliness'].map(field => (
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
          Submit / Update
        </button>
      </form>
    </div>
  );
}