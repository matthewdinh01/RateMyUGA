import React from "react";
import styles from './PrevRankings.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

type PrevRankingsProps = {
    rankings: [string, number][];
};

function PrevRankings({ rankings }: PrevRankingsProps) {
    const rankColor = (rank: number) => {
        if (rank >= 8) {
            return "green"
        } else if (rank <= 3) {
            return "red"
        } else {
            return "orange"
        }
    };

    return (
        <div>
            {rankings.map((ranking, index) => (
                <div key={index} className={styles.rankingItem}>
                    <span className={styles.name}>{ranking[0]}</span>
                    <span className={styles.rank} style={{backgroundColor: rankColor(ranking[1])}}> {ranking[1]} </span>
                    <button className={`${styles.button} ${styles.editButton}`}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className={`${styles.button} ${styles.deleteButton}`}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PrevRankings;