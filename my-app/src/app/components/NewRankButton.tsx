"use client"
import React from 'react';
import styles from './LogoutButton.module.css';
import { useRouter } from 'next/navigation'

function NewRankButton() {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.push('/pages/create-bolton-rating')} className={styles.logoutBtn}>New Ranking</button>
        </div>
    );
}

export default NewRankButton;