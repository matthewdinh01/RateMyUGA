"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you could add logic to verify the login credentials if needed

    console.log('Username:', username);
    console.log('Password:', password);

    setUsername('');
    setPassword('');

    router.push('/');
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>RateMyUGA Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            className={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
        <button type="button" className={styles.clearButton} onClick={handleCancel}>Cancel</button>
      </form>
      <div className={styles.footer}>
        <p>Create Account</p>
        <p>About RateMyUGA | About Us</p>
      </div>
    </div>
  );
};

export default LoginForm;
