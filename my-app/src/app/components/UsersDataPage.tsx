import LogoutButton from "./LogoutButton";
import NewRankButton from "./NewRankButton";
import PrevRanking from "./PrevRankings";
import React from "react";

const rankings: [string, number][] = [
    ["Bolton Dining Commons", 9],
    ["Science Library", 7],
    ["Chick-fil-a", 8],
    ["Main Library", 3]
  ];

function UsersDataPage() {
    return(
        <div>
            <nav></nav>
            <h1>Welcome USER!</h1>
            <h2>Your Rankings</h2>
            <LogoutButton/>
            <NewRankButton/>
            <PrevRanking rankings={rankings}/>
        </div>
    );
}

export default UsersDataPage;