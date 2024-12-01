"use client";

import React, { useState } from "react";
import styles from "./LocationDetails.module.css";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import NavigationBar from "./NavigationBar";

interface Location {
  name: string;
  address: string;
  image: string;
  extraInfo?: { [key: string]: boolean };
  scores: { [key: string]: number };
  comments: { user: string; text: string }[];
  images: { user: string; text: string }[];
}

const LocationDetails: React.FC<{ location: Location }> = ({ location }) => {
  const [comments, setComments] = useState(location.comments || []);
  const [images, setImages] = useState(location.images || []);
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
      <NavigationBar/>
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
        
           <div className={styles.commentsSection}>
              <h2>Comments</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                    <img
                      src={images[index].text}
                      alt={`Submission by a user`}
                    />
                  </li>
                ))}
              </ul>
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
