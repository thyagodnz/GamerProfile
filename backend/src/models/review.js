import { db } from "../db.js";

export const reviewModel = {
  listarTodos() {
    const stmt = db.prepare(`
      SELECT
        id,
        user_id AS userId,
        game_id AS gameId,
        comentario,
        nota,
        data_criacao AS dataCriacao
      FROM reviews
    `);

    return stmt.all();
  },

  buscarPorId(id) {
    const stmt = db.prepare(`
      SELECT
        id,
        user_id AS userId,
        game_id AS gameId,
        comentario,
        nota,
        data_criacao AS dataCriacao
      FROM reviews
      WHERE id = ?
    `);

    return stmt.get(id) || null;
  },

  inserir({ userId, gameId, comentario, nota, dataCriacao }) {
    const stmt = db.prepare(`
      INSERT INTO reviews (
        user_id,
        game_id,
        comentario,
        nota,
        data_criacao
      )
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(userId, gameId, comentario, nota, dataCriacao);

    return {
      id: result.lastInsertRowid,
      userId,
      gameId,
      comentario,
      nota,
      dataCriacao,
    };
  },

  atualizar(id, dados) {
    const reviewAtual = this.buscarPorId(id);

    if (!reviewAtual) {
      return null;
    }

    const reviewAtualizada = {
      ...reviewAtual,
      ...dados,
      id,
    };

    const stmt = db.prepare(`
      UPDATE reviews
      SET
        user_id = ?,
        game_id = ?,
        comentario = ?,
        nota = ?,
        data_criacao = ?
      WHERE id = ?
    `);

    stmt.run(
      reviewAtualizada.userId,
      reviewAtualizada.gameId,
      reviewAtualizada.comentario,
      reviewAtualizada.nota,
      reviewAtualizada.dataCriacao,
      id,
    );

    return reviewAtualizada;
  },

  remover(id) {
    const stmt = db.prepare(`
      DELETE FROM reviews
      WHERE id = ?
    `);

    const result = stmt.run(id);

    return result.changes > 0;
  },
};
