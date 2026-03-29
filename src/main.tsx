import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { api } from "./lib/api";

// Warm up the backend (free-tier cold start)
api.listCandidates().catch(() => {});

// TalentAI — HR Decision Platform
createRoot(document.getElementById("root")!).render(<App />);
