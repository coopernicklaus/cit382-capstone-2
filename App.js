import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ListView from "./views/ListView";
import NewChoreView from "./views/NewChoreView";

const FUN_QUOTES = [
  "You touched grass today 🌱",
  "Future you is proud already",
  "Productivity combo achieved!",
  "Small steps > no steps",
  "XP gained. Dopamine delivered.",
  "Somewhere, a to-do list fears you",
  "The procrastination monster retreats",
  "You just unlocked Adulting Skill +1",
  "Nice. Very nice.",
  "Momentum is building...",
];

export default function App() {
  const [chores, setChores] = useState(() => {
    const raw = localStorage.getItem("chores");
    return raw ? JSON.parse(raw) : [];
  });

  const [xp, setXp] = useState(() => {
    const raw = localStorage.getItem("xp");
    return raw ? JSON.parse(raw) : 0;
  });

  const [quote, setQuote] = useState("");

  function showRandomQuote() {
    const random = FUN_QUOTES[Math.floor(Math.random() * FUN_QUOTES.length)];
    setQuote(random);

    // Clear existing timer if any, then hide after 4s
    if (window.__quoteTimer) clearTimeout(window.__quoteTimer);
    window.__quoteTimer = setTimeout(() => setQuote(""), 4000);
  }

  // External sync effects
  useEffect(() => {
    localStorage.setItem("chores", JSON.stringify(chores));
  }, [chores]);

  useEffect(() => {
    localStorage.setItem("xp", JSON.stringify(xp));
  }, [xp]);

  // Optional: show remaining chores in tab title (nice for demo video)
  useEffect(() => {
    const remaining = chores.filter((c) => !c.completed).length;
    document.title = `Chores (${remaining} left)`;
  }, [chores]);

  function addChore(title) {
    const t = title.trim();
    if (!t) return;

    const reward = Math.floor(Math.random() * 16) + 5; // 5–20 XP

    setChores((prev) => [
      { id: crypto.randomUUID(), title: t, completed: false, reward },
      ...prev,
    ]);
  }

  function toggleChore(id) {
    setChores((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      );

      const before = prev.find((c) => c.id === id);
      const after = updated.find((c) => c.id === id);

      if (before && after) {
        let delta = 0;

        if (!before.completed && after.completed) delta = before.reward ?? 10;
        if (before.completed && !after.completed) delta = -(before.reward ?? 10);

        if (delta !== 0) {
          setXp((oldXp) => {
            const newXp = Math.max(0, oldXp + delta);

            // Trigger quote only when crossing into a new 50-xp bucket
            const oldBucket = Math.floor(oldXp / 50);
            const newBucket = Math.floor(newXp / 50);
            if (newBucket > oldBucket) showRandomQuote();

            return newXp;
          });
        }
      }

      return updated;
    });
  }

  function deleteChore(id) {
    setChores((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ListView
            chores={chores}
            xp={xp}
            quote={quote}
            onToggle={toggleChore}
            onDelete={deleteChore}
          />
        }
      />
      <Route path="/new" element={<NewChoreView onAddChore={addChore} />} />
    </Routes>
  );
}
