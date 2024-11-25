"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import styles from './LoginForm.module.css';
import { doCredentialLogin } from '../actions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    //console.log(formData)
    try {
      await doCredentialLogin(formData);
      router.push("/pages/Dashboard")
    } catch (err: any) {
      console.log(err);
    }
    // console.log("hello", response)
    // if (response.ok) {
    //   router.push("/pages/Dashboard")
    // } else {
    //   console.log("get fucked");    
    // }
    // console.log(formData);

    // try {
    //     // setLoading(true);
    //     const response = await doCredentialLogin(formData);

    //     if (response.ok) {
    //         // Navigate to a protected page or show success
    //         console.log("Login successful!");
    //         router.push("/dashboard");
    //     } else {
    //         console.log("Login failed. Please try again.");
    //     }
    // } catch (err: any) {
    //     console.log(err);
    // }
};

  // const handleSubmit = (e: React.FormEvent) => {
  //   // e.preventDefault();

  //   // // Here you could add logic to verify the login credentials if needed

  //   // console.log('Username:', username);
  //   // console.log('Password:', password);

  //   // setUsername('');
  //   // setPassword('');

  //   // router.push('/pages/Dashboard');

  //     e.preventDefault();  
  // };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>RateMyUGA Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
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
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function setError(arg0: any) {
  throw new Error('Function not implemented.');
}

