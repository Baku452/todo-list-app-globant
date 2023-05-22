import React, { useCallback, useEffect, useRef, useState } from "react";
import { Task } from "../../types/note.type";
import { FaTimes } from "react-icons/fa";
import styles from "./Card.module.css";
import { toast } from "react-toastify";

export interface CardProps {
  task: Task;
  fetchData: () => void;
  deleteTask: (taskId: number) => void;
  completeTask: (taskId: number, completed: boolean) => void;
}
const Card: React.FC<CardProps> = ({ task, deleteTask, completeTask }) => {
  const [completed, setCompleted] = useState<boolean>(task.completed);
  const [description, setDescription] = useState<string>(task.description);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const cardRef = useRef<HTMLInputElement>(null);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const calculateDaysPassed = (startDate: number): string => {
    const currentDate = new Date();
    const start = new Date(startDate);

    const timeDiff = currentDate.getTime() - start.getTime();

    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysPassed === 0) {
      return "Created Today";
    } else {
      return "Created " + daysPassed + " day(s) ago";
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
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    [apiUrl]
  );

  const handleDeleteTask = async (taskId: number) => {
    try {
      deleteTask(taskId);
      await fetch(apiUrl + `tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      toast.error(error.message ?? "Error Deleting Task", {
        position: toast.POSITION.TOP_RIGHT,
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
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    completeTask(task.id, completed);
    setCompletedNote(task.id, completed);
  }, [completed]);

  useEffect(() => {
    if (description.trim() === "") {
      setError("Field is required");
    } else {
      setError("");
    }
  }, [description]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        cardRef &&
        cardRef.current &&
        !cardRef.current.contains(event.target)
      ) {
        setEditMode(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${completed ? styles.card__completed : ""}`}
    >
      <div className={styles.card__description}>
        {editMode ? (
          <input
            className={styles.inputDescription}
            onBlur={() => {
              handleEditTask(task.id, description);
            }}
            required={true}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <div onClick={() => setEditMode(true)}>
            {error && <span className={styles.field__required}>{error}</span>}
            <p>{description}</p>
          </div>
        )}

        <p className={styles.card__dateCreated}>
          {calculateDaysPassed(task.creationDate)}
        </p>
      </div>
      <div className={styles.card__actions}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted((checked) => !checked)}
        />
        <button
          className={styles.buttonDelete}
          onClick={() => handleDeleteTask(task.id)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Card;
