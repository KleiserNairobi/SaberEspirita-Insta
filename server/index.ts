import express from "express";
import { createServer } from "http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const DATA_DIR = path.resolve(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const EVENTS_FILE = path.join(DATA_DIR, "events.json");

// Helper to read/write events
function readEvents() {
  if (!fs.existsSync(EVENTS_FILE)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(EVENTS_FILE, "utf-8"));
}

function writeEvents(events: any[]) {
  fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API Routes
  app.get("/api/events", (_req, res) => {
    try {
      const events = readEvents();
      res.json(events);
    } catch (error) {
      console.error("Error reading events:", error);
      res.status(500).json({ error: "Failed to read events" });
    }
  });

  app.put("/api/events/:id", (req, res) => {
    try {
      const { id } = req.params;
      const updatedEvent = req.body;
      const events = readEvents();
      const index = events.findIndex((e: any) => e.id === id);

      if (index !== -1) {
        events[index] = { ...events[index], ...updatedEvent };
        writeEvents(events);
        res.json(events[index]);
      } else {
        res.status(404).json({ error: "Event not found" });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
