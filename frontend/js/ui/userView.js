const form = document.querySelector("#form-user");
const lista = document.querySelector("#lista-users");

function criarLinha(user, aoRemover) {
  const li = document.createElement("li");

  li.className =
    "list-group-item d-flex justify-content-between align-items-center";

  const texto = document.createElement("span");

  texto.textContent = `#${user.id} — ${user.nome} (${user.email})`;

  const btn = document.createElement("button");

  btn.className = "btn btn-sm btn-outline-danger";
  btn.textContent = "Remover";

  btn.addEventListener("click", () => {
    aoRemover(user.id);
  });

  li.append(texto, btn);

  return li;
}

export const userView = {
  renderLista(users, aoRemover) {
    lista.innerHTML = "";

    if (users.length === 0) {
      lista.innerHTML =
        '<li class="list-group-item text-muted">Nenhum usuário cadastrado.</li>';
      return;
    }

    users.forEach((user) => {
      lista.appendChild(criarLinha(user, aoRemover));
    });
  },

  limparForm() {
    form.reset();
  },

  onSubmit(callback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      callback({
        nome: document.querySelector("#user-nome").value,
        email: document.querySelector("#user-email").value,
        senha: document.querySelector("#user-senha").value,
        // fotoPerfil: document.querySelector("#user-foto")?.value || "",
      });
    });
  },
};
