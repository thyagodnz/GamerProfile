import { db } from "../db.js";

export const userModel = {
  listarTodos() {
    const stmt = db.prepare(`
      SELECT 
        id,
        nome,
        email,
        senha,
        foto_perfil AS fotoPerfil
      FROM users
    `);

    return stmt.all();
  },

  buscarPorId(id) {
    const stmt = db.prepare(`
      SELECT 
        id,
        nome,
        email,
        senha,
        foto_perfil AS fotoPerfil
      FROM users
      WHERE id = ?
    `);

    return stmt.get(id) || null;
  },

  buscarPorEmail(email) {
    const stmt = db.prepare(`
      SELECT 
        id,
        nome,
        email,
        senha,
        foto_perfil AS fotoPerfil
      FROM users
      WHERE email = ?
    `);

    return stmt.get(email) || null;
  },

  existeEmail(email) {
    const stmt = db.prepare(`
      SELECT 1
      FROM users
      WHERE email = ?
    `);

    return !!stmt.get(email);
  },

  inserir({ nome, email, senha, fotoPerfil = null }) {
    const stmt = db.prepare(`
      INSERT INTO users (
        nome,
        email,
        senha,
        foto_perfil
      )
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(nome, email, senha, fotoPerfil);

    return {
      id: result.lastInsertRowid,
      nome,
      email,
      senha,
      fotoPerfil,
    };
  },

  atualizar(id, dados) {
    const usuarioAtual = this.buscarPorId(id);

    if (!usuarioAtual) {
      return null;
    }

    const usuarioAtualizado = {
      ...usuarioAtual,
      ...dados,
      id,
    };

    const stmt = db.prepare(`
      UPDATE users
      SET
        nome = ?,
        email = ?,
        senha = ?,
        foto_perfil = ?
      WHERE id = ?
    `);

    stmt.run(
      usuarioAtualizado.nome,
      usuarioAtualizado.email,
      usuarioAtualizado.senha,
      usuarioAtualizado.fotoPerfil,
      id,
    );

    return usuarioAtualizado;
  },

  remover(id) {
    const stmt = db.prepare(`
      DELETE FROM users
      WHERE id = ?
    `);

    const result = stmt.run(id);

    return result.changes > 0;
  },
};
