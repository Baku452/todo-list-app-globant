import React, { useState } from "react";
import { toast } from "react-toastify";

export interface ActionHeaderProps {
  fetchData: () => void;
}
const ActionHeader: React.FC<ActionHeaderProps> = ({ fetchData }) => {
  const apiUrl = import.meta.env.VITE_API_BACKEND;

  const [note, setNote] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + "tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: note, completed: false }),
      });

      if (response.ok) {
        toast.success("Note create succesfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error("Failed to create the note", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message ?? "An error", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      fetchData();
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
        />
        <button onSubmit={handleSubmit}>Add a Note</button>
      </form>
    </div>
  );
};

export default ActionHeader;
