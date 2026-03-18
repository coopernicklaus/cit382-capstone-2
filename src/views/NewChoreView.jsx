import { useNavigate, Link } from "react-router-dom";
import ChoreForm from "../components/ChoreForm";

export default function NewChoreView({ onAddChore }) {
  const nav = useNavigate();

  return (
    <div>
      <h2>New Chore</h2>
      <ChoreForm
        onAddChore={(title) => {
          onAddChore(title);
          nav("/");
        }}
      />
      <Link to="/">Cancel</Link>
    </div>
  );
}
