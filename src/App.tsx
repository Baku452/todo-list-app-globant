import { useEffect, useState } from "react";
import "./App.css";
import ActionHeader from "./components/ActionHeader/ActionHeader";
import { Note } from "./types/note.type";
import { GridCard } from "./components/GridCard/GridCard";
import NoRecords from "./components/NoRecords/NoRecords";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const fetchData = async () => {
    const response = await fetch(apiUrl + "tasks");
    const jsonData = await response.json();
    setNotes(jsonData);
    return jsonData;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <h1>TO DO App</h1>
      <ActionHeader fetchData={fetchData} />
      {notes.length >= 0 ? <GridCard notes={notes} /> : <NoRecords />}
    </main>
  );
}

export default App;
