"use client";

import React from 'react';
import styles from './DiningHallInfo.module.css'; // Reuse the same CSS for consistent styling

const restaurants = [
  {
    id: 1,
    name: 'Tate Chick-fil-A',
    address: '45 Tate Center Drive, Athens, GA',
    image: '/tatechick.jpg',
    restaurantScore: {
      total: 9.0,
      foodQuality: 9.5,
      serviceSpeed: 8.8,
      affordability: 9.0,
      cleanliness: 8.5,
    },
    comments: [
      { user: 'student1', text: 'Best chicken sandwiches on campus!' },
      { user: 'student2', text: 'Fast and friendly service.' },
    ],
  },
  {
    id: 2,
    name: 'Panda Express',
    address: 'Bulldog Cafe, 45 Baxter St. Athens, GA 30602',
    image: '/panda.jpg',
    restaurantScore: {
      total: 8.2,
      foodQuality: 8.5,
      serviceSpeed: 8.0,
      affordability: 7.8,
      cleanliness: 8.4,
    },
    comments: [
      { user: 'student3', text: 'Great options, love the orange chicken!' },
      { user: 'student4', text: 'Sometimes the line gets long.' },
    ],
  },
  {
    id: 3,
    name: 'Barberitos',
    address: 'Market at Tate, 45 Baxter St. Athens, GA 30602',
    image: '/barberitos.webp',
    restaurantScore: {
      total: 8.2,
      foodQuality: 8.5,
      serviceSpeed: 8.0,
      affordability: 7.8,
      cleanliness: 8.4,
    },
    comments: [
      { user: 'student3', text: 'Great options, love the orange chicken!' },
      { user: 'student4', text: 'Sometimes the line gets long.' },
    ],
  },
  {
    id: 4,
    name: 'Einstein Bros. Bagels at Main Library',
    address: 'Science Learning Center, 130 Carlton St. Athens, GA 30602',
    image: '/einsteinbros.jpeg',
    restaurantScore: {
      total: 8.2,
      foodQuality: 8.5,
      serviceSpeed: 8.0,
      affordability: 7.8,
      cleanliness: 8.4,
    },
    comments: [
      { user: 'student3', text: 'Great options, love the orange chicken!' },
      { user: 'student4', text: 'Sometimes the line gets long.' },
    ],
  },
  {
    id: 5,
    name: 'Jittery Joe\'s at MLC',
    address: 'UGA Miller Learning Center, 48 Baxter St. Athens, GA 30602',
    image: '/jittery.webp',
    restaurantScore: {
      total: 8.2,
      foodQuality: 8.5,
      serviceSpeed: 8.0,
      affordability: 7.8,
      cleanliness: 8.4,
    },
    comments: [
      { user: 'student3', text: 'Great options, love the orange chicken!' },
      { user: 'student4', text: 'Sometimes the line gets long.' },
    ],
  },
];

const RestaurantInfo = () => {
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
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className={styles.card}>
            <div className={styles.cardContent}>
              <h2 className={styles.cardHeader}>{restaurant.name}</h2>
              <span className={styles.rating}>Rating: {restaurant.restaurantScore.total}/10</span>
              <p className={styles.address}><strong>Address:</strong> {restaurant.address}</p>
              <ul className={styles.scores}>
                <li>Food Quality: {restaurant.restaurantScore.foodQuality}/10</li>
                <li>Service Speed: {restaurant.restaurantScore.serviceSpeed}/10</li>
                <li>Affordability: {restaurant.restaurantScore.affordability}/10</li>
                <li>Cleanliness: {restaurant.restaurantScore.cleanliness}/10</li>
              </ul>
              <div>
                <h3>Comments</h3>
                {restaurant.comments.map((comment, index) => (
                  <p key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.cardImageWrapper}>
              <img src={restaurant.image} alt={restaurant.name} className={styles.cardImage} />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default RestaurantInfo;
