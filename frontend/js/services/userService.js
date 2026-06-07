import { api } from "../api.js";

export const userService = {
  listar() {
    return api.getUsers();
  },

  buscarPorId(id) {
    return api.getUser(id);
  },

  async criar({ nome, email, senha, fotoPerfil }) {
    if (!nome || !nome.trim()) {
      throw new Error("Nome é obrigatório");
    }

    if (!email || !email.trim()) {
      throw new Error("Email é obrigatório");
    }

    if (!senha || !senha.trim()) {
      throw new Error("Senha é obrigatória");
    }

    return api.createUser({
      nome: nome.trim(),
      email: email.trim(),
      senha: senha.trim(),
      fotoPerfil: fotoPerfil?.trim() || null,
    });
  },

  async atualizar(id, dados) {
    if (dados.nome !== undefined && !dados.nome.trim()) {
      throw new Error("Nome não pode ser vazio");
    }

    if (dados.email !== undefined && !dados.email.trim()) {
      throw new Error("Email não pode ser vazio");
    }

    return api.updateUser(id, dados);
  },

  remover(id) {
    return api.deleteUser(id);
  },
};
