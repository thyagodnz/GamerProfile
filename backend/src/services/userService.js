import { userModel } from '../models/user.js';

export const userService = {
    listarTodos() {
        return userModel
            .listarTodos()
            .map(({ senha, ...user }) => user);
    },

    buscarPorId(id) {
        const user = userModel.buscarPorId(id);

        if (!user) {
            const err = new Error('Usuário não encontrado');
            err.status = 404;
            throw err;
        }

        const { senha, ...userSemSenha } = user;
        return userSemSenha;
    },

    criar({ nome, email, senha, fotoPerfil }) {
        // Regra 1: campos obrigatórios
        if (!nome || !email || !senha) {
            const err = new Error(
                'Campos "nome", "email" e "senha" são obrigatórios'
            );
            err.status = 400;
            throw err;
        }

        // Regra 2: validação simples de e-mail
        const emailValido = /\S+@\S+\.\S+/;

        if (!emailValido.test(email)) {
            const err = new Error('E-mail inválido');
            err.status = 400;
            throw err;
        }

        // Regra 3: e-mail único
        if (userModel.existeEmail(email)) {
            const err = new Error('Já existe um usuário com este e-mail');
            err.status = 409;
            throw err;
        }

        const novoUsuario = userModel.inserir({
            nome,
            email,
            senha,
            fotoPerfil
        });

        const { senha: _, ...userSemSenha } = novoUsuario;
        return userSemSenha;
    },

    atualizar(id, dados) {
        // Se estiver alterando email, verificar unicidade
        if (dados.email) {
            const existente = userModel.buscarPorEmail(dados.email);

            if (existente && existente.id !== id) {
                const err = new Error('Já existe um usuário com este e-mail');
                err.status = 409;
                throw err;
            }
        }

        const atualizado = userModel.atualizar(id, dados);

        if (!atualizado) {
            const err = new Error('Usuário não encontrado');
            err.status = 404;
            throw err;
        }

        const { senha, ...userSemSenha } = atualizado;
        return userSemSenha;
    },

    remover(id) {
        const removido = userModel.remover(id);

        if (!removido) {
            const err = new Error('Usuário não encontrado');
            err.status = 404;
            throw err;
        }
    }
};