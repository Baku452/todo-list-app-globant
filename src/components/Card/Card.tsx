import React, { useCallback, useEffect, useState } from "react";
import { Note } from "../../types/note.type";
import { FaTimes } from "react-icons/fa";
import styles from "./Card.module.css";
import { toast } from "react-toastify";

export interface CardProps {
  note: Note;
  fetchData: () => void;
}
const Card: React.FC<CardProps> = ({ note, fetchData }) => {
  const [completed, setCompleted] = useState<boolean>(note.completed);
  const [description, setDescription] = useState<string>(note.description);
  const [editMode, setEditMode] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_BACKEND;

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

  const handleEditTask = useCallback(
    async (taskId: number, newDescription: string) => {
      try {
        await fetch(apiUrl + `tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: newDescription }),
        });
      } catch (error: any) {
        toast.error(error.message ?? "Error updating task", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    [apiUrl]
  );

  const handleDeleteTask = async (taskId: number) => {
    try {
      await fetch(apiUrl + `tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      toast.error(error.message ?? "Error Deleting Task", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    const setCompletedNote = async (taskId: number, isCompleted: boolean) => {
      try {
        await fetch(apiUrl + `tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: isCompleted }),
        });
      } catch (error: any) {
        toast.error(error.message ?? "Error setting complete the task", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    setCompletedNote(note.id, completed);
  }, [completed]);

  useEffect(() => {
    if (description !== "") {
      // handleEditTask(note.id, description);
    } else {
      handleDeleteTask(note.id);
      fetchData();
    }
  }, [description]);

  return (
    <div className={styles.card}>
      <div>
        {editMode ? (
          <input
            className={styles.inputDescription}
            onBlur={() => {
              setEditMode(false);
              handleEditTask(note.id, description);
            }}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p onClick={() => setEditMode((value) => !value)}>{description}</p>
        )}
        <p className={styles.card__dateCreated}>
          {calculateDaysPassed(note.creationDate)}
        </p>
      </div>
      <div className={styles.card__actions}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted((checked) => !checked)}
        />
        <button onClick={() => handleDeleteTask(note.id)}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Card;
