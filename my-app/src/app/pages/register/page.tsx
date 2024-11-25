import React from 'react';
import RegistrationForm from '../../components/RegisterForm'; 
import styles from '../../components/page.module.css';
import Link from 'next/link';

const RegistrationPage = () => {
  return (
    <div className={styles.centerContainer}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
