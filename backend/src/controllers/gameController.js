import { gameService } from '../services/gameService.js';

export const gameController = {
    listarTodos(req, res) {
        const jogos = gameService.listarTodos();
        res.json(jogos);
    },

    buscarPorId(req, res) {
        const jogo = gameService.buscarPorId(Number(req.params.id));
        res.json(jogo);
    },

    criar(req, res) {
        const jogoCriado = gameService.criar(req.body);
        res.status(201).json(jogoCriado);
    },

    atualizar(req, res) {
        const jogoAtualizado = gameService.atualizar(
            Number(req.params.id),
            req.body
        );

        res.json(jogoAtualizado);
    },

    remover(req, res) {
        gameService.remover(Number(req.params.id));
        res.status(204).end();
    },
};