"use client";

import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./UsersDataPage.module.css";

interface Ranking {
  _id: string;
  email: string;
  location: string;
  foodQuality: number;
  foodVariety: number;
  service: number;
  cleanliness: number;
  comments: string;
  images: string;
}

const UserInfo = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRanking, setSelectedRanking] = useState<Ranking | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const session = await getSession();
        const user = session?.user;
        const email = user?.email;
        const response = await fetch(`/api/rankings/myall/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch rankings");
        }
        const data = await response.json();
        setRankings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/rankings/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete ranking");
      }
      setRankings((prev) => prev.filter((ranking) => ranking._id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const openEditModal = (ranking: Ranking) => {
    setSelectedRanking(ranking);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRanking(null);
    setModalOpen(false);
  };

  const handleUpdate = async (updatedRanking: Ranking) => {
    try {
      const response = await fetch(`/api/rankings/update/${updatedRanking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRanking),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update ranking");
      }
  
      const updatedData = await response.json();
      setRankings((prev) =>
        prev.map((ranking) =>
          ranking._id === updatedData.ranking._id ? updatedData.ranking : ranking
        )
      );
      closeModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading rankings...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Rankings for {rankings[0]?.email || "unknown user"}</h1>
      {rankings.length === 0 ? (
        <p>No rankings found.</p>
      ) : (
        <div className={styles.rankings}>
          {rankings.map((ranking) => (
            <div key={ranking._id} className={styles.rankingCard}>
              <h2>{ranking.location}</h2>
              <ul className={styles.criteriaList}>
                {Object.entries(ranking)
                  .filter(([key]) => !["_id", "email", "location", "comments", "images", "__v"].includes(key))
                  .map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
              </ul>
              <p>
                <strong>Comments:</strong> {ranking.comments}
              </p>
              <p>
                <strong>Image:</strong>
                <img src={ranking.images} className={styles.images}></img>
              </p>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => openEditModal(ranking)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(ranking._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && selectedRanking && (
        <EditModal
          ranking={selectedRanking}
          onClose={closeModal}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

interface EditModalProps {
  ranking: Ranking;
  onClose: () => void;
  onSave: (updatedRanking: Ranking) => void;
}

const EditModal: React.FC<EditModalProps> = ({ ranking, onClose, onSave }) => {
  const [updatedRanking, setUpdatedRanking] = useState(ranking);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedRanking({ ...updatedRanking, [name]: value });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Ranking for {ranking.location}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(updatedRanking);
          }}
        >
          {Object.entries(ranking)
            .filter(([key]) => !["_id", "email", "location", "comments", "images", "__v"].includes(key))
            .map(([key, value]) => (
              <div key={key} className={styles.formGroup}>
                <label htmlFor={key}>{key}</label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={(updatedRanking as any)[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          <div className={styles.formGroup}>
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={updatedRanking.comments}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="images">Image</label>
            <textarea
              id="images"
              name="images"
              value={updatedRanking.images}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;