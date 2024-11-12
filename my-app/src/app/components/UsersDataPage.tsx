import LogoutButton from "./LogoutButton";
import NewRankButton from "./NewRankButton";
import PrevRanking from "./PrevRankings";
import React from "react";
import styles from './UsersDataPage.module.css';

const rankings: [string, number][] = [
    ["Bolton Dining Commons", 9],
    ["Science Library", 7],
    ["Chick-fil-a", 8],
    ["Main Library", 3]
  ];

function UsersDataPage() {
    return(
        <div>
            <div className={styles.container1}>
                <h3>Welcome USER!</h3>

                <NewRankButton/>
                <LogoutButton/>
            </div>

            <h1>Your Rankings</h1>
            <PrevRanking rankings={rankings}/>
        </div>
    );
}

export default UsersDataPage;