import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error overlay for seamless remote debugging
window.addEventListener("error", (event) => {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="padding: 30px; background: #150808; color: #ff9494; font-family: 'Space Grotesk', monospace; border: 2px solid #ff3b3b; margin: 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <h3 style="margin-top: 0; color: #ff3b3b; font-size: 24px;">⚠️ Runtime Error Occurred</h3>
        <p style="font-size: 16px; margin: 15px 0;"><strong>Message:</strong> ${event.message}</p>
        <p style="font-size: 14px; color: #ffb3b3;"><strong>Source:</strong> ${event.filename}:${event.lineno}:${event.colno}</p>
        <pre style="background: #000000; color: #00ffcc; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px; line-height: 1.5; border: 1px solid #333;">${event.error?.stack || 'No stack trace available'}</pre>
      </div>
    `;
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="padding: 30px; background: #150808; color: #ff9494; font-family: 'Space Grotesk', monospace; border: 2px solid #ff3b3b; margin: 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <h3 style="margin-top: 0; color: #ff3b3b; font-size: 24px;">⚠️ Unhandled Promise Rejection</h3>
        <p style="font-size: 16px; margin: 15px 0;"><strong>Reason:</strong> ${event.reason?.message || event.reason}</p>
        <pre style="background: #000000; color: #00ffcc; padding: 20px; border-radius: 8px; overflow-x: auto; font-size: 13px; line-height: 1.5; border: 1px solid #333;">${event.reason?.stack || 'No stack trace available'}</pre>
      </div>
    `;
  }
});

createRoot(document.getElementById("root")!).render(<App />);
