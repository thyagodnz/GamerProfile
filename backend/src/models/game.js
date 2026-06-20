import { db } from "../db.js";

export const gameModel = {
  listarTodos() {
    const stmt = db.prepare(`
      SELECT
        id,
        titulo,
        descricao,
        capa,
        genero,
        data_lancamento AS dataLancamento
      FROM games
    `);

    return stmt.all();
  },

  buscarPorId(id) {
    const stmt = db.prepare(`
      SELECT
        id,
        titulo,
        descricao,
        capa,
        genero,
        data_lancamento AS dataLancamento
      FROM games
      WHERE id = ?
    `);

    return stmt.get(id) || null;
  },

  buscarPorTitulo(titulo) {
    const stmt = db.prepare(`
      SELECT
        id,
        titulo,
        descricao,
        capa,
        genero,
        data_lancamento AS dataLancamento
      FROM games
      WHERE LOWER(titulo) = LOWER(?)
    `);

    return stmt.get(titulo) || null;
  },

  existeTitulo(titulo) {
    const stmt = db.prepare(`
      SELECT 1
      FROM games
      WHERE LOWER(titulo) = LOWER(?)
    `);

    return !!stmt.get(titulo);
  },

  inserir({ titulo, descricao, capa = null, genero, dataLancamento }) {
    const stmt = db.prepare(`
      INSERT INTO games (
        titulo,
        descricao,
        capa,
        genero,
        data_lancamento
      )
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(titulo, descricao, capa, genero, dataLancamento);

    return {
      id: result.lastInsertRowid,
      titulo,
      descricao,
      capa,
      genero,
      dataLancamento,
    };
  },

  atualizar(id, dados) {
    const gameAtual = this.buscarPorId(id);

    if (!gameAtual) {
      return null;
    }

    const gameAtualizado = {
      ...gameAtual,
      ...dados,
      id,
    };

    const stmt = db.prepare(`
      UPDATE games
      SET
        titulo = ?,
        descricao = ?,
        capa = ?,
        genero = ?,
        data_lancamento = ?
      WHERE id = ?
    `);

    stmt.run(
      gameAtualizado.titulo,
      gameAtualizado.descricao,
      gameAtualizado.capa,
      gameAtualizado.genero,
      gameAtualizado.dataLancamento,
      id,
    );

    return gameAtualizado;
  },

  remover(id) {
    const stmt = db.prepare(`
      DELETE FROM games
      WHERE id = ?
    `);

    const result = stmt.run(id);

    return result.changes > 0;
  },
};
