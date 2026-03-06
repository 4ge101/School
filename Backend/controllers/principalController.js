import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { broadcast } from "../server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const DATA_PATH  = join(__dirname, "../data/principal.json");

const read  = () => JSON.parse(readFileSync(DATA_PATH, "utf-8"));
const write = (data) => writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

const principalController = {
  get: (req, res) => {
    try {
      res.json(read());
    } catch (err) {
      res.status(500).json({ message: "Could not read principal data" });
    }
  },

  update: (req, res) => {
    try {
      const updated = { ...read(), ...req.body };
      write(updated);

      // 🔴 Broadcast to ALL connected clients instantly
      broadcast({ type: "PRINCIPAL_UPDATED", data: updated });

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Could not save principal data" });
    }
  },
};

export default principalController;