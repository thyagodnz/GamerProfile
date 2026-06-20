import { DatabaseSync } from "node:sqlite";

// abre (ou cria) o arquivo do banco na raiz do projeto
export const db = new DatabaseSync("banco.db");

// integridade referencial: o SQLite exige ligar explicitamente
db.exec("PRAGMA foreign_keys = ON;");

// cria as tabelas se ainda não existirem (roda toda vez, sem erro)
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL,
        foto_perfil TEXT
    );

    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL UNIQUE,
        descricao TEXT NOT NULL,
        capa TEXT,
        genero TEXT NOT NULL,
        data_lancamento TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        game_id INTEGER NOT NULL,
        comentario TEXT NOT NULL,
        nota INTEGER,
        data_criacao TEXT NOT NULL,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE,

        FOREIGN KEY (game_id)
            REFERENCES games(id)
            ON DELETE CASCADE
    );
`);
