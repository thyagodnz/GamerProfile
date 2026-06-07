import { gameModel } from "../models/game.js";

export const gameService = {
  listarTodos() {
    return gameModel.listarTodos();
  },

  buscarPorId(id) {
    const game = gameModel.buscarPorId(id);

    if (!game) {
      const err = new Error("Jogo não encontrado");
      err.status = 404;
      throw err;
    }

    return game;
  },

  criar({ titulo, descricao, capa, genero, dataLancamento }) {
    // Regra 1: campos obrigatórios
    if (!titulo || !descricao || !genero || !dataLancamento) {
      const err = new Error(
        'Campos "titulo", "descricao", "genero" e "dataLancamento" são obrigatórios',
      );
      err.status = 400;
      throw err;
    }

    // Regra 2: título único
    if (gameModel.existeTitulo(titulo)) {
      const err = new Error("Já existe um jogo com este título");
      err.status = 409;
      throw err;
    }

    return gameModel.inserir({
      titulo,
      descricao,
      capa,
      genero,
      dataLancamento,
    });
  },

  atualizar(id, dados) {
    // Se estiver alterando o título, verificar unicidade
    if (dados.titulo) {
      const existente = gameModel.buscarPorTitulo(dados.titulo);

      if (existente && existente.id !== id) {
        const err = new Error("Já existe um jogo com este título");
        err.status = 409;
        throw err;
      }
    }

    const atualizado = gameModel.atualizar(id, dados);

    if (!atualizado) {
      const err = new Error("Jogo não encontrado");
      err.status = 404;
      throw err;
    }

    return atualizado;
  },

  remover(id) {
    const removido = gameModel.remover(id);

    if (!removido) {
      const err = new Error("Jogo não encontrado");
      err.status = 404;
      throw err;
    }
  },
};
