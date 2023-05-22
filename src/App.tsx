import { useEffect, useState } from "react";
import "./App.css";
import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Task } from "./types/note.type";
import { GridCard } from "./components/GridCard/GridCard";
import NoRecords from "./components/NoRecords/NoRecords";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const fetchData = async () => {
    const response = await fetch(apiUrl + "tasks");
    const jsonData = await response.json();
    setTasks(jsonData);
    return jsonData;
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData();
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main>
      <h1>TO DO App</h1>
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
