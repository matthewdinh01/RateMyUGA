import LogoutButton from "./LogoutButton";
import NewRankButton from "./NewRankButton";
import PrevRanking from "./PrevRankings";
import React from "react";

const rankings: [string, number][] = [
    ["Bolton Dining Commons", 9],
    ["Science Library", 7],
    ["Chick-fil-a", 8]
  ];

function UsersDataPage() {
    return(
        <div>
            <nav></nav>
            <LogoutButton/>
            <NewRankButton/>
            <PrevRanking rankings={rankings}/>
        </div>
    );
}

export default UsersDataPage;