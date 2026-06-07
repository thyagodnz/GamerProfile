let reviews = [];
let nextId = 1;

export const reviewModel = {
  listarTodos() {
    return reviews;
  },

  buscarPorId(id) {
    return reviews.find((r) => r.id === id) || null;
  },

  inserir({ userId, gameId, comentario, nota, dataCriacao }) {
    const nova = {
      id: nextId++,
      userId,
      gameId,
      comentario,
      nota,
      dataCriacao,
    };

    reviews.push(nova);

    return nova;
  },

  atualizar(id, dados) {
    const idx = reviews.findIndex((r) => r.id === id);

    if (idx === -1) {
      return null;
    }

    reviews[idx] = {
      ...reviews[idx],
      ...dados,
      id,
    };

    return reviews[idx];
  },

  remover(id) {
    const tamanhoAntes = reviews.length;

    reviews = reviews.filter((r) => r.id !== id);

    return reviews.length < tamanhoAntes;
  },
};
