"use client"
import styles from './LogoutButton.module.css'
import { useRouter } from 'next/navigation'
import { doLogout } from '../actions';

function LogoutButton() {
    const router = useRouter();
    return(
        <div>
            <button onClick={() => doLogout()} className={styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default LogoutButton;