import { userService } from "./services/userService.js";
import { gameService } from "./services/gameService.js";
import { reviewService } from "./services/reviewService.js";

import { userView } from "./ui/userView.js";
import { gameView } from "./ui/gameView.js";
import { reviewView } from "./ui/reviewView.js";

const alerta = document.querySelector("#alerta");

let usersCache = [];
let gamesCache = [];

function mostrarErro(msg) {
  alerta.textContent = msg;
  alerta.classList.remove("d-none");
}

function limparErro() {
  alerta.classList.add("d-none");
  alerta.textContent = "";
}

function preencherSelect(id, itens, campoTexto) {
  const select = document.querySelector(id);

  const valorAtual = select.value;

  const textoPadrao =
    id === "#review-user" ? "Selecione um usuário..." : "Selecione um jogo...";

  select.innerHTML = `<option value="">${textoPadrao}</option>`;

  itens.forEach((item) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item[campoTexto];

    select.appendChild(option);
  });

  select.value = valorAtual;
}

// ====================
// USERS
// ====================

async function atualizarUsers() {
  usersCache = await userService.listar();

  userView.renderLista(usersCache, removerUser);

  preencherSelect("#review-user", usersCache, "nome");
}

async function criarUser(dados) {
  limparErro();

  try {
    await userService.criar(dados);

    userView.limparForm();

    await atualizarUsers();
  } catch (err) {
    mostrarErro(err.message);
  }
}

async function removerUser(id) {
  limparErro();

  try {
    await userService.remover(id);

    await atualizarUsers();
    await atualizarReviews();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ====================
// GAMES
// ====================

async function atualizarGames() {
  gamesCache = await gameService.listar();

  gameView.renderLista(gamesCache, removerGame);

  preencherSelect("#review-game", gamesCache, "titulo");
}

async function criarGame(dados) {
  limparErro();

  try {
    await gameService.criar(dados);

    gameView.limparForm();

    await atualizarGames();
  } catch (err) {
    mostrarErro(err.message);
  }
}

async function removerGame(id) {
  limparErro();

  try {
    await gameService.remover(id);

    await atualizarGames();
    await atualizarReviews();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ====================
// REVIEWS
// ====================

async function atualizarReviews() {
  const reviews = await reviewService.listar();

  reviewView.renderLista(reviews, usersCache, gamesCache, removerReview);
}

async function criarReview(dados) {
  limparErro();

  try {
    await reviewService.criar(dados);

    reviewView.limparForm();

    await atualizarReviews();
  } catch (err) {
    mostrarErro(err.message);
  }
}

async function removerReview(id) {
  limparErro();

  try {
    await reviewService.remover(id);

    await atualizarReviews();
  } catch (err) {
    mostrarErro(err.message);
  }
}

// ====================
// EVENTOS
// ====================

userView.onSubmit(criarUser);
gameView.onSubmit(criarGame);
reviewView.onSubmit(criarReview);

// ====================
// INICIALIZAÇÃO
// ====================

async function iniciar() {
  try {
    await atualizarUsers();
    await atualizarGames();
    await atualizarReviews();
  } catch (err) {
    mostrarErro(
      "Não foi possível conectar à API. Verifique se o backend está rodando.",
    );
  }
}

iniciar();
