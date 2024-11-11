import React from "react";

type PrevRankingsProps = {
    rankings: [string, number][];
};

function PrevRankings({ rankings }: PrevRankingsProps) {
    return (
        <div>
            {rankings.map((ranking, index) => (
                <div key={index}>
                    <h3>{ranking[0]}</h3>
                    <p>Rating: {ranking[1]}</p>
                </div>
            ))}
        </div>
    );
}

export default PrevRankings;