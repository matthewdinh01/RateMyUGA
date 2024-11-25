"use client";

import React, { useState } from "react";
import styles from "./LocationDetails.module.css";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Location {
  name: string;
  address: string;
  image: string;
  extraInfo?: { [key: string]: boolean };
  scores: { [key: string]: number };
  comments: { user: string; text: string }[];
}

const Header = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle clicking outside of dropdown
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
            src="/uga-logo.png" 
            alt="UGA Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold">RateMyUGA</h1>
          <p>University of Georgia</p>
        </button>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-red-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => router.push("/")}
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

const LocationDetails: React.FC<{ location: Location }> = ({ location }) => {
  const [comments, setComments] = useState(location.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "Anonymous", text: newComment }]);
      setNewComment("");
    }
  };

  // Calculate the total score dynamically
  const totalScore = Object.entries(location.scores)
    .filter(([key]) => key !== "Overall")
    .reduce((sum, [, value]) => sum + value, 0);

  const numberOfCategories = Object.entries(location.scores).filter(([key]) => key !== "Overall").length;
  const averageScore = numberOfCategories > 0 ? (totalScore / numberOfCategories).toFixed(1) : "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h1 className={styles.cardHeader}>{location.name}</h1>
            <p className={styles.address}>
              <strong>Address:</strong> {location.address}
            </p>

            {location.extraInfo && (
              <ul className={styles.extraInfo}>
                {Object.entries(location.extraInfo).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> 
                    <span>{value ? "Yes" : "No"}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Total Score */}
            <p className={styles.rating}>
              <strong>Total Score:</strong> {averageScore}/10
            </p>

            {/* Sub-ranking categories */}
            <ul className={styles.scores}>
              {Object.entries(location.scores).map(([key, value]) => (
                key !== "Overall" && (
                  <li key={key}>
                    <strong>{key}:</strong> 
                    <span>{value}/10</span>
                  </li>
                )
              ))}
            </ul>

            {/* Comments Section */}
            <div className={styles.commentsSection}>
              <h2>Comments</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </li>
                ))}
              </ul>
              {/* <textarea
                className={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className={styles.postCommentButton}
              >
                Post Comment
              </button> */}
            </div>
          </div>
          <div className={styles.cardImageWrapper}>
            <img
              src={location.image}
              alt={location.name}
              className={styles.cardImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
