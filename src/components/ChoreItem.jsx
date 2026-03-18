// ChoreItem.jsx
export default function ChoreItem({ chore, onToggle, onDelete }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={chore.completed}
          onChange={() => onToggle(chore.id)}
        />
        <span>{chore.title}</span>
      </label>

      <button onClick={() => onDelete(chore.id)} style={{ marginLeft: 8 }}>
        Delete
      </button>
    </li>
  );
}
