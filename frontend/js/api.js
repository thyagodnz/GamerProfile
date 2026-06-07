import { API_URL } from "./config.js";

async function request(caminho, opcoes = {}) {
  const resp = await fetch(`${API_URL}${caminho}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...opcoes,
  });

  if (!resp.ok) {
    let msg = `Erro ${resp.status}`;

    try {
      const corpo = await resp.json();

      if (corpo?.error) {
        msg = corpo.error;
      }
    } catch (_) {
      // resposta sem JSON
    }

    throw new Error(msg);
  }

  if (resp.status === 204) {
    return null;
  }

  return resp.json();
}

export const api = {
  // ====================
  // USERS
  // ====================

  getUsers() {
    return request("/users");
  },

  getUser(id) {
    return request(`/users/${id}`);
  },

  createUser(dados) {
    return request("/users", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  updateUser(id, dados) {
    return request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  },

  deleteUser(id) {
    return request(`/users/${id}`, {
      method: "DELETE",
    });
  },

  // ====================
  // GAMES
  // ====================

  getGames() {
    return request("/games");
  },

  getGame(id) {
    return request(`/games/${id}`);
  },

  createGame(dados) {
    return request("/games", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  updateGame(id, dados) {
    return request(`/games/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  },

  deleteGame(id) {
    return request(`/games/${id}`, {
      method: "DELETE",
    });
  },

  // ====================
  // REVIEWS
  // ====================

  getReviews() {
    return request("/reviews");
  },

  getReview(id) {
    return request(`/reviews/${id}`);
  },

  createReview(dados) {
    return request("/reviews", {
      method: "POST",
      body: JSON.stringify(dados),
    });
  },

  updateReview(id, dados) {
    return request(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    });
  },

  deleteReview(id) {
    return request(`/reviews/${id}`, {
      method: "DELETE",
    });
  },
};
