import { reviewModel } from "../models/review.js";
import { userModel } from "../models/user.js";
import { gameModel } from "../models/game.js";

export const reviewService = {
  listarTodos() {
    return reviewModel.listarTodos();
  },

  buscarPorId(id) {
    const review = reviewModel.buscarPorId(id);

    if (!review) {
      const err = new Error("Review não encontrada");
      err.status = 404;
      throw err;
    }

    return review;
  },

  criar({ userId, gameId, comentario, nota }) {
    if (!comentario || !comentario.trim()) {
      const err = new Error("Comentário é obrigatório");

      err.status = 400;
      throw err;
    }

    const user = userModel.buscarPorId(userId);

    if (!user) {
      const err = new Error("Usuário não encontrado");

      err.status = 404;
      throw err;
    }

    const game = gameModel.buscarPorId(gameId);

    if (!game) {
      const err = new Error("Jogo não encontrado");

      err.status = 404;
      throw err;
    }

    return reviewModel.inserir({
      userId,
      gameId,
      comentario: comentario.trim(),
      nota: nota || null,
      dataCriacao: new Date().toISOString(),
    });
  },

  atualizar(id, dados) {
    const review = reviewModel.atualizar(id, dados);

    if (!review) {
      const err = new Error("Review não encontrada");

      err.status = 404;
      throw err;
    }

    return review;
  },

  remover(id) {
    const removido = reviewModel.remover(id);

    if (!removido) {
      const err = new Error("Review não encontrada");

      err.status = 404;
      throw err;
    }
  },
};
