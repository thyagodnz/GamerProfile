const form = document.querySelector("#form-review");
const lista = document.querySelector("#lista-reviews");

function criarLinha(review, users, games, aoRemover) {
  const li = document.createElement("li");

  li.className =
    "list-group-item d-flex justify-content-between align-items-start";

  const user = users.find((u) => u.id === review.userId);

  const game = games.find((g) => g.id === review.gameId);

  const nomeUser = user?.nome || "Usuário removido";

  const tituloGame = game?.titulo || "Jogo removido";

  const data = new Date(review.dataCriacao).toLocaleDateString("pt-BR");

  const conteudo = document.createElement("div");

  conteudo.className = "me-3";

  conteudo.innerHTML = `
    <strong>
        ${nomeUser}
        →
        ${tituloGame}
    </strong>

    <div class="mt-1">
        ${review.comentario}
    </div>

    ${
      review.nota
        ? `<small class="text-muted">⭐ Nota: ${review.nota}/10</small><br>`
        : ""
    }

    <small class="text-muted">
        ${data}
    </small>
`;

  const btn = document.createElement("button");

  btn.className = "btn btn-sm btn-outline-danger";

  btn.textContent = "Remover";

  btn.addEventListener("click", () => aoRemover(review.id));

  li.append(conteudo, btn);

  return li;
}

export const reviewView = {
  renderLista(reviews, users, games, aoRemover) {
    lista.innerHTML = "";

    if (reviews.length === 0) {
      lista.innerHTML =
        '<li class="list-group-item text-muted">Nenhuma review cadastrada.</li>';

      return;
    }

    reviews.forEach((review) => {
      lista.appendChild(criarLinha(review, users, games, aoRemover));
    });
  },

  limparForm() {
    form.reset();
  },

  onSubmit(callback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      callback({
        userId: document.querySelector("#review-user").value,

        gameId: document.querySelector("#review-game").value,

        comentario: document.querySelector("#review-comentario").value,

        nota: document.querySelector("#review-nota").value,
      });
    });
  },
};
