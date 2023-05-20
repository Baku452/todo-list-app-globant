import { useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const fetchData = async () => {
    const response = await fetch(apiUrl + "tasks");
    const jsonData = await response.json();
    return jsonData;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <Card />
    </main>
  );
}

export default App;
