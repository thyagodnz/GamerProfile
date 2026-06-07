const form = document.querySelector("#form-game");
const lista = document.querySelector("#lista-games");

function criarLinha(game, aoRemover) {
  const li = document.createElement("li");

  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  const texto = document.createElement("span");

  const data = new Date(game.dataLancamento).toLocaleDateString("pt-BR");

  texto.innerHTML = `
    <strong>#${game.id} — ${game.titulo}</strong><br>
    <small class="text-muted">
        ${game.genero} • ${data}
    </small><br>
    ${game.descricao}
`;

  const btn = document.createElement("button");

  btn.className = "btn btn-sm btn-outline-danger";
  btn.textContent = "Remover";

  btn.addEventListener("click", () => {
    aoRemover(game.id);
  });

  li.append(texto, btn);

  return li;
}

export const gameView = {
  renderLista(games, aoRemover) {
    lista.innerHTML = "";

    if (games.length === 0) {
      lista.innerHTML =
        '<li class="list-group-item text-muted">Nenhum jogo cadastrado.</li>';
      return;
    }

    games.forEach((game) => {
      lista.appendChild(criarLinha(game, aoRemover));
    });
  },

  limparForm() {
    form.reset();
  },

  onSubmit(callback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      callback({
        titulo: document.querySelector("#game-titulo").value,
        descricao: document.querySelector("#game-descricao").value,
        genero: document.querySelector("#game-genero").value,
        dataLancamento: document.querySelector("#game-data").value,
        // capa: document.querySelector("#game-capa")?.value || "",
      });
    });
  },
};
