import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { trackPageView } from "./lib/telemetry";

// Disparar notificacion de visita silenciosa
trackPageView();

createRoot(document.getElementById("root")!).render(<App />);
