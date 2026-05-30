import { userService } from '../services/userService.js';

export const userController = {
    listarTodos(req, res) {
        const usuarios = userService.listarTodos();
        res.json(usuarios);
    },

    buscarPorId(req, res) {
        const usuario = userService.buscarPorId(Number(req.params.id));
        res.json(usuario);
    },

    criar(req, res) {
        const usuarioCriado = userService.criar(req.body);
        res.status(201).json(usuarioCriado);
    },

    atualizar(req, res) {
        const usuarioAtualizado = userService.atualizar(
            Number(req.params.id),
            req.body
        );

        res.json(usuarioAtualizado);
    },

    remover(req, res) {
        userService.remover(Number(req.params.id));
        res.status(204).end();
    },
};