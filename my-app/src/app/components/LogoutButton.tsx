"use client"
import styles from './LogoutButton.module.css'
import { useRouter } from 'next/navigation'



function LogoutButton() {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => router.push('/')} className={styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default LogoutButton;