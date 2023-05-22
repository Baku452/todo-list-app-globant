import React from "react";
import styles from "./GridCard.module.css";
import { Note } from "../../types/note.type";
import Card from "../Card/Card";

export interface GridCardProps {
  notes: Note[];
  fetchData: () => void;
}
export const GridCard: React.FC<GridCardProps> = ({ notes, fetchData }) => {
  return (
    <div className={styles.gridCard}>
      {notes.map((note) => (
        <Card key={note.id} note={note} fetchData={fetchData} />
      ))}
    </div>
  );
};
