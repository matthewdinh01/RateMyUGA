"use client";

import React from 'react';
import styles from './DiningHallInfo.module.css';

const diningHalls = [
  {
    id: 1,
    name: 'Bolton Dining Commons',
    address: '790 S. Lumpkin St. Athens, GA 30602',
    image: '/Bolton.png',
    boltonScore: {
      total: 5,
      foodQuality: 4,
      foodVariety: 9,
      service: 6,
      cleanliness: 8,
    },
    comments: [
      { user: 'user123', text: 'Really good food, it is super good! I love it.' },
      { user: 'user555', text: 'I love it.' },
    ],
  },
  {
    id: 2,
    name: 'Snelling Dining Commons',
    address: '200 W. Green St. Athens, GA 30602',
    image: '/snelling.webp',
    boltonScore: {
      total: 5,
      foodQuality: 4,
      foodVariety: 9,
      service: 6,
      cleanliness: 8,
    },
    comments: [
      { user: 'user123', text: 'Really good food, it is super good! I love it.' },
      { user: 'user555', text: 'I love it.' },
    ],
  },
  {
    id: 3,
    name: 'Oglethorpe Dining Commons',
    address: '160 University Ct. Athens, GA 30602',
    image: '/ohouse.jpg',
    boltonScore: {
      total: 5,
      foodQuality: 4,
      foodVariety: 9,
      service: 6,
      cleanliness: 8,
    },
    comments: [
      { user: 'user123', text: 'Really good food, it is super good! I love it.' },
      { user: 'user555', text: 'I love it.' },
    ],
  },
  {
    id: 4,
    name: 'Village Summit Dining Commons',
    address: 'Joe Frank Harris Commons 80 Carlton St. Athens, GA 30602',
    image: '/joefrank.webp',
    boltonScore: {
      total: 5,
      foodQuality: 4,
      foodVariety: 9,
      service: 6,
      cleanliness: 8,
    },
    comments: [
      { user: 'user123', text: 'Really good food, it is super good! I love it.' },
      { user: 'user555', text: 'I love it.' },
    ],
  },
  {
    id: 5,
    name: 'Niche Dining Commons',
    address: 'UGA Health Sciences Campus 104 Spear Rd. Athens, GA 30602',
    image: '/niche.webp',
    boltonScore: {
      total: 5,
      foodQuality: 4,
      foodVariety: 9,
      service: 6,
      cleanliness: 8,
    },
    comments: [
      { user: 'user123', text: 'Really good food, it is super good! I love it.' },
      { user: 'user555', text: 'I love it.' },
    ],
  },
];

const DiningHallInfo = () => {
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
        {diningHalls.map((hall) => (
          <div key={hall.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardHeader}>{hall.name}</h2>
              <span className={styles.rating}>Rating: {hall.boltonScore.total}/10</span>
              <p className={styles.address}><strong>Address:</strong> {hall.address}</p>
              <ul className={styles.scores}>
                <li>Food Quality Score: {hall.boltonScore.foodQuality}/10</li>
                <li>Food Variety Score: {hall.boltonScore.foodVariety}/10</li>
                <li>Service Score: {hall.boltonScore.service}/10</li>
                <li>Cleanliness Score: {hall.boltonScore.cleanliness}/10</li>
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

export default DiningHallInfo;
