import { api } from "../api.js";

export const reviewService = {
  listar() {
    return api.getReviews();
  },

  buscarPorId(id) {
    return api.getReview(id);
  },

  async criar({ userId, gameId, comentario, nota }) {
    if (!userId) {
      throw new Error("Selecione um usuário");
    }

    if (!gameId) {
      throw new Error("Selecione um jogo");
    }

    if (!comentario || !comentario.trim()) {
      throw new Error("Comentário é obrigatório");
    }

    return api.createReview({
      userId: Number(userId),
      gameId: Number(gameId),
      comentario: comentario.trim(),
      nota: nota ? Number(nota) : null,
    });
  },

  remover(id) {
    return api.deleteReview(id);
  },
};
