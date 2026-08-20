import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import gamesRouter from "./routes/games.js";
import reviewsRouter from "./routes/reviews.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:5173",
      "https://gamer-profile-2.vercel.app",
    ],
  }),
);
app.use(express.json());
app.use(logger);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Rotas ---
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/reviews", reviewsRouter);

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({
    api: "Gamer Profile API",
    versao: "1.0.0",
    rotas: ["/auth", "/users", "/games", "/reviews"],
  });
});

// --- Error Handler (sempre o último) ---
app.use(errorHandler);

export default app;
