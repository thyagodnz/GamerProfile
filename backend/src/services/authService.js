import { userModel } from "../models/user.js";

export const authService = {
  login({ email, senha }) {
    if (!email || !senha) {
      const err = new Error('Campos "email" e "senha" são obrigatórios');
      err.status = 400;
      throw err;
    }

    const usuario = userModel.buscarPorEmail(email);

    // Autenticação SIMPLES: compara a senha em texto puro com a do banco.
    // (Em produção real, a senha ficaria "hasheada" — ex.: bcrypt.)
    if (!usuario || usuario.senha !== senha) {
      const err = new Error("E-mail ou senha inválidos");
      err.status = 401;
      throw err;
    }

    const { senha: _senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  },
};
