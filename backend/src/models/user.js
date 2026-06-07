let users = [];
let nextId = 1;

export const userModel = {
  listarTodos() {
    return users;
  },

  buscarPorId(id) {
    return users.find((u) => u.id === id) || null;
  },

  buscarPorEmail(email) {
    return users.find((u) => u.email === email) || null;
  },

  existeEmail(email) {
    return users.some((u) => u.email === email);
  },

  inserir({ nome, email, senha, fotoPerfil = null }) {
    const novo = {
      id: nextId++,
      nome,
      email,
      senha,
      fotoPerfil,
    };

    users.push(novo);
    return novo;
  },

  atualizar(id, dados) {
    const idx = users.findIndex((u) => u.id === id);

    if (idx === -1) {
      return null;
    }

    users[idx] = {
      ...users[idx],
      ...dados,
      id, // garante que o ID não seja alterado
    };

    return users[idx];
  },

  remover(id) {
    const tamanhoAntes = users.length;

    users = users.filter((u) => u.id !== id);

    return users.length < tamanhoAntes;
  },
};
