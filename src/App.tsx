import { useEffect, useState } from "react";
import "./App.css";
import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Task } from "./types/note.type";
import { GridCard } from "./components/GridCard/GridCard";
import NoRecords from "./components/NoRecords/NoRecords";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCompleted, setTaskCompleted] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const fetchData = async () => {
    const response = await fetch(apiUrl + "tasks");
    const jsonData = await response.json();
    setTasks(jsonData);
    return jsonData;
  };

  const getTasksCompleted = () => {
    const tasksCompleted = tasks.reduce((count, currentValue) => {
      if (currentValue.completed) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    setTaskCompleted(tasksCompleted);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getTasksCompleted();
  }, [tasks]);

  return (
    <main>
      <h1>TO DO App</h1>
      <div style={{ padding: "1rem 0" }}>
        Actions Completed: {tasksCompleted} / {tasks.length}
      </div>
      <ActionHeader fetchData={fetchData} />
      {tasks && tasks.length >= 0 && (
        <GridCard fetchData={fetchData} tasks={tasks} setTasks={setTasks} />
      )}
      {tasks.length === 0 && !loading && <NoRecords />}
      {loading && <Spinner />}
    </main>
  );
}

export default App;
