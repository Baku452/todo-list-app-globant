import React, { Dispatch, SetStateAction } from "react";
import styles from "./GridCard.module.css";
import { Task } from "../../types/note.type";
import Card from "../Card/Card";

export interface GridCardProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  fetchData: () => void;
}
export const GridCard: React.FC<GridCardProps> = ({
  tasks,
  fetchData,
  setTasks,
}) => {
  const deleteTask = (taskId: number) => {
    const tasksUpdated = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksUpdated);
  };
  return (
    <div className={styles.gridCard}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
          fetchData={fetchData}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};
