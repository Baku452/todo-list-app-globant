import { useEffect, useState } from "react";
import "./App.css";
import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Note } from "./types/note.type";
import { GridCard } from "./components/GridCard/GridCard";
import NoRecords from "./components/NoRecords/NoRecords";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [tasks, setTasks] = useState<Note[]>([]);
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
    }, 1000);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setLoading(false);
    }
  }, [tasks]);
  return (
    <main>
      <h1>TO DO App</h1>
      <ActionHeader fetchData={fetchData} />
      {tasks.length >= 0 && <GridCard fetchData={fetchData} notes={tasks} />}
      {!loading && tasks.length === 0 && <NoRecords />}
      {loading && <Spinner />}
    </main>
  );
}

export default App;
