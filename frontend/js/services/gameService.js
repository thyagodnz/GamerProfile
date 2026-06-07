import { api } from "../api.js";

export const gameService = {
  listar() {
    return api.getGames();
  },

  buscarPorId(id) {
    return api.getGame(id);
  },

  async criar({ titulo, descricao, capa, genero, dataLancamento }) {
    if (!titulo || !titulo.trim()) {
      throw new Error("Título é obrigatório");
    }

    if (!descricao || !descricao.trim()) {
      throw new Error("Descrição é obrigatória");
    }

    if (!genero || !genero.trim()) {
      throw new Error("Gênero é obrigatório");
    }

    if (!dataLancamento) {
      throw new Error("Data de lançamento é obrigatória");
    }

    return api.createGame({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      capa: capa?.trim() || null,
      genero: genero.trim(),
      dataLancamento,
    });
  },

  async atualizar(id, dados) {
    if (dados.titulo !== undefined && !dados.titulo.trim()) {
      throw new Error("Título não pode ser vazio");
    }

    if (dados.descricao !== undefined && !dados.descricao.trim()) {
      throw new Error("Descrição não pode ser vazia");
    }

    if (dados.genero !== undefined && !dados.genero.trim()) {
      throw new Error("Gênero não pode ser vazio");
    }

    return api.updateGame(id, dados);
  },

  remover(id) {
    return api.deleteGame(id);
  },
};
