import React, { useState } from "react";
import { Note } from "../../types/note.type";
import { FaTimes } from "react-icons/fa";
import styles from "./Card.module.css";

export interface CardProps {
  note: Note;
}
const Card: React.FC<CardProps> = ({ note }) => {
  const [completed, setCompleted] = useState<boolean>(note.completed);

  const calculateDaysPassed = (startDate: number): string => {
    const currentDate = new Date();
    const start = new Date(startDate);

    const timeDiff = currentDate.getTime() - start.getTime();

    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysPassed === 0) {
      return "Created Today";
    } else {
      return "Created " + daysPassed + "ago";
    }
  };
  return (
    <div className={styles.card}>
      <div>
        <p>{note.description}</p>
        <p className={styles.card__dateCreated}>
          {calculateDaysPassed(note.creationDate)}
        </p>
      </div>
      <div className={styles.card__actions}>
        <input type="checkbox" checked={completed} />
        <button>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Card;
