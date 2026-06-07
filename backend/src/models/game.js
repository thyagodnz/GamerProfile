let games = [];
let nextId = 1;

export const gameModel = {
  listarTodos() {
    return games;
  },

  buscarPorId(id) {
    return games.find((g) => g.id === id) || null;
  },

  buscarPorTitulo(titulo) {
    return (
      games.find((g) => g.titulo.toLowerCase() === titulo.toLowerCase()) || null
    );
  },

  existeTitulo(titulo) {
    return games.some((g) => g.titulo.toLowerCase() === titulo.toLowerCase());
  },

  inserir({ titulo, descricao, capa = null, genero, dataLancamento }) {
    const novo = {
      id: nextId++,
      titulo,
      descricao,
      capa,
      genero,
      dataLancamento,
    };

    games.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const idx = games.findIndex((g) => g.id === id);

    if (idx === -1) {
      return null;
    }

    games[idx] = {
      ...games[idx],
      ...dados,
      id, // garante que o ID não seja alterado
    };

    return games[idx];
  },

  remover(id) {
    const tamanhoAntes = games.length;

    games = games.filter((g) => g.id !== id);

    return games.length < tamanhoAntes;
  },
};
