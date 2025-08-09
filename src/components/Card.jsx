import React from "react";
import styles from "../module/card.module.css";

const Card = ({ image, name, title, category,exp,handleRequest }) => {
  return (
    <div className={styles.card}>
        <div className={styles.uper}>
      <img src={image} alt={name} className={styles.cardImage} />
      <button className={styles.metorship} onClick={handleRequest}>Request</button>
      </div>
      <h2 className={styles.cardName}>{name}</h2>
      <p className={styles.cardTitle}>{title}</p>
      <div>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardCategory}>{exp} years of Experience</p>
      </div>
    </div>
  );
};

export default Card;
