import { Link } from "react-router-dom";
import ChoreList from "../components/ChoreList";

export default function ListView({ chores, xp, quote, onToggle, onDelete }) {
  return (
    <div>
      <h2>Chores</h2>

      <p>
        <strong>XP:</strong> {xp} {"  "}
        <strong>LEVEL:</strong> {Math.floor(xp / 100) + 1}
      </p>

      {quote && <div className="quote-popup">{quote}</div>}

      <Link to="/new">Add chore</Link>

      <ChoreList chores={chores} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}
