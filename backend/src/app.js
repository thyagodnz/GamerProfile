import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import gamesRouter from "./routes/games.js";
import reviewsRouter from "./routes/reviews.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// --- Middleware global ---
app.use(cors());
app.use(express.json()); // parseia JSON no body
app.use(logger); // loga toda requisição

// --- Rotas ---
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/reviews", reviewsRouter);

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({
    api: "Gamer Profile API",
    versao: "1.0.0",
    rotas: ["/users", "/games", "/reviews"],
  });
});

// --- Error Handler (sempre o último) ---
app.use(errorHandler);

export default app;
