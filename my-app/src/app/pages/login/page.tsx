import React from 'react';
import LoginForm from '../components/LoginForm'; 
import styles from '../components/page.module.css';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className={styles.centerContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
