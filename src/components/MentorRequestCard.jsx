import React, { useEffect, useState } from "react";
import styles from "../module/MentorRequestCard.module.css";

function MentorRequestCard({ mentorId, menteeId, onAccept, onReject }) {
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const res = await fetch(`http://localhost:8000/user/getuser/${menteeId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch mentee");
        const data = await res.json();
        setMentee(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMentee();
  }, [menteeId]);

  if (!mentee) {
    return (
      <div className={styles.card}>
        Loading mentee details...
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{mentee.name}</h3>
      <div className={styles.buttons}>
        <button className={styles.btnAccept} onClick={onAccept}>
          Accept
        </button>
        <button className={styles.btnReject} onClick={onReject}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default MentorRequestCard;
