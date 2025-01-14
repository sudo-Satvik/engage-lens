import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:4173", "https://engage-lens.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

import analyticsRouter from "./routes/routes";
app.use("/api/analytics", analyticsRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});

export { app };
