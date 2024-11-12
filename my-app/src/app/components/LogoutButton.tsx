import styles from './LogoutButton.module.css'
import useRouter from ''

function logout() {
    /* isLoggedIn = false;*/
}

function LogoutButton() {
    return(
        <div>
            <button /*onClick={logout}*/ className={styles.logoutBtn}>Logout</button>
        </div>
    );
}

export default LogoutButton;