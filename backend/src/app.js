import express from 'express';
import usersRouter from './routes/users.js';
import gamesRouter from './routes/games.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// --- Middleware global ---
app.use(express.json());   // parseia JSON no body
app.use(logger);           // loga toda requisição

// --- Rotas ---
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

// --- Health Check ---
app.get('/', (req, res) => {
  res.json({
    api: 'Gamer Profile API',
    versao: '1.0.0',
    rotas: [
      '/users',
      '/games'
    ]
  });
});

// --- Error Handler (sempre o último) ---
app.use(errorHandler);

export default app;