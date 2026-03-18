// ChoreList.jsx
import ChoreItem from "./ChoreItem";

export default function ChoreList({ chores, onToggle, onDelete }) {
  if (chores.length === 0) return <p>No chores yet.</p>;
  return (
    <ul>
      {chores.map((c) => (
        <ChoreItem key={c.id} chore={c} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
