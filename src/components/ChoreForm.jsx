import { useState } from "react";

export default function ChoreForm({ onAddChore }) {
  const [title, setTitle] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddChore(title);
        setTitle("");
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Dishes"
      />
      <button type="submit">Save</button>
    </form>
  );
}
