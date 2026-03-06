import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import authRoutes from "./routes/auth.js";
import principalRoutes from "./routes/principal.js";

dotenv.config();

const app    = express();
const server = createServer(app);
export const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/principal", principalRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "School API Server Running" }));

// WebSocket connections
wss.on("connection", (ws) => {
  console.log("🔌 WS client connected");
  ws.on("close", () => console.log("🔌 WS client disconnected"));
});

// Broadcast helper — call this after any principal update
export function broadcast(payload) {
  const msg = JSON.stringify(payload);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(msg);
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

server.listen(PORT, () => {
  console.log(`✅ Server + WS running on http://localhost:${PORT}`);
});