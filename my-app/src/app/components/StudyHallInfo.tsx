"use client";

import React from 'react';
import styles from './DiningHallInfo.module.css'; // Reuse the same CSS for consistency

const studyHalls = [
  {
    id: 1,
    name: 'Miller Learning Center (MLC) Study Hall',
    address: '48 Baxter St. Athens, GA',
    image: '/MLC.png',
    studyHallScore: {
      total: 8.7,
      quietness: 9.2,
      seatingAvailability: 8.5,
      lighting: 8.8,
      cleanliness: 8.3,
    },
    comments: [
      { user: 'student1', text: 'Great atmosphere for studying!' },
      { user: 'student2', text: 'Lighting is excellent, but seating can be limited.' },
    ],
  },
  {
    id: 2,
    name: 'Science Learning Center (SLC)',
    address: '130 Carlton St. Athens, GA 30602',
    image: '/SLC.jpg',
    studyHallScore: {
      total: 8.5,
      quietness: 9.0,
      seatingAvailability: 8.0,
      lighting: 8.7,
      cleanliness: 8.5,
    },
    comments: [
      { user: 'student3', text: 'Very quiet and spacious.' },
      { user: 'student4', text: 'Perfect for focused studying.' },
    ],
  },
  {
    id: 3,
    name: 'Main Library',
    address: '320 S. Jackson St. Athens, GA',
    image: '/mainlibrary.jpg',
    studyHallScore: {
      total: 8.7,
      quietness: 9.2,
      seatingAvailability: 8.5,
      lighting: 8.8,
      cleanliness: 8.3,
    },
    comments: [
      { user: 'student1', text: 'Great atmosphere for studying!' },
      { user: 'student2', text: 'Lighting is excellent, but seating can be limited.' },
    ],
  },
  {
    id: 4,
    name: 'Tate Student Center',
    address: '45 Baxter St. Athens, GA 30602',
    image: '/tatestudent.jpg',
    studyHallScore: {
      total: 8.7,
      quietness: 9.2,
      seatingAvailability: 8.5,
      lighting: 8.8,
      cleanliness: 8.3,
    },
    comments: [
      { user: 'student1', text: 'Great atmosphere for studying!' },
      { user: 'student2', text: 'Lighting is excellent, but seating can be limited.' },
    ],
  },
  {
    id: 5,
    name: 'McBay Science Library',
    address: '210 D.W. Brooks Dr. Athens, GA 30602',
    image: '/science.jpg',
    studyHallScore: {
      total: 8.7,
      quietness: 9.2,
      seatingAvailability: 8.5,
      lighting: 8.8,
      cleanliness: 8.3,
    },
    comments: [
      { user: 'student1', text: 'Great atmosphere for studying!' },
      { user: 'student2', text: 'Lighting is excellent, but seating can be limited.' },
    ],
  },
];

const StudyHallInfo = () => {
  return (
    <div className={styles.container}>
      {/* Top Bar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logo.png" alt="RateMyUGA Logo" className={styles.logoImage} />
          <span>RateMyUGA</span>
        </div>
        <input type="text" className={styles.searchBar} placeholder="Search" />
        <div className={styles.actions}>
          <button className={styles.signOutButton}>Sign Out</button>
        </div>
      </header>

      {/* Cards Section */}
      <main className={styles.mainContent}>
        {studyHalls.map((hall) => (
          <div key={hall.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardHeader}>{hall.name}</h2>
              <span className={styles.rating}>Rating: {hall.studyHallScore.total}/10</span>
              <p className={styles.address}><strong>Address:</strong> {hall.address}</p>
              <ul className={styles.scores}>
                <li>Quietness: {hall.studyHallScore.quietness}/10</li>
                <li>Seating Availability: {hall.studyHallScore.seatingAvailability}/10</li>
                <li>Lighting: {hall.studyHallScore.lighting}/10</li>
                <li>Cleanliness: {hall.studyHallScore.cleanliness}/10</li>
              </ul>
              <div>
                <h3>Comments</h3>
                {hall.comments.map((comment, index) => (
                  <p key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.cardImageWrapper}>
              <img src={hall.image} alt={hall.name} className={styles.cardImage} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default StudyHallInfo;
