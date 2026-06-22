import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Gamer Profile API",
      version: "1.0.0",
      description: "API REST para gerenciamento de usuários, jogos e reviews.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
      {
        url: "https://gamerprofile.onrender.com",
        description: "Servidor produção",
      },
    ],

    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            nome: {
              type: "string",
              example: "João Silva",
            },
            email: {
              type: "string",
              example: "joao@email.com",
            },
            senha: {
              type: "string",
              example: "123456",
            },
            fotoPerfil: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/foto.jpg",
            },
          },
        },

        UserInput: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: {
              type: "string",
              example: "João Silva",
            },
            email: {
              type: "string",
              example: "joao@email.com",
            },
            senha: {
              type: "string",
              example: "123456",
            },
            fotoPerfil: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/foto.jpg",
            },
          },
        },

        Game: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            titulo: {
              type: "string",
              example: "The Witcher 3",
            },
            descricao: {
              type: "string",
              example: "RPG de mundo aberto",
            },
            capa: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/capa.jpg",
            },
            genero: {
              type: "string",
              example: "RPG",
            },
            dataLancamento: {
              type: "string",
              format: "date",
              example: "2015-05-19",
            },
          },
        },

        GameInput: {
          type: "object",
          required: ["titulo", "descricao", "genero", "dataLancamento"],
          properties: {
            titulo: {
              type: "string",
              example: "The Witcher 3",
            },
            descricao: {
              type: "string",
              example: "RPG de mundo aberto",
            },
            capa: {
              type: "string",
              nullable: true,
              example: "https://exemplo.com/capa.jpg",
            },
            genero: {
              type: "string",
              example: "RPG",
            },
            dataLancamento: {
              type: "string",
              format: "date",
              example: "2015-05-19",
            },
          },
        },

        Review: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            userId: {
              type: "integer",
              example: 1,
            },
            gameId: {
              type: "integer",
              example: 2,
            },
            comentario: {
              type: "string",
              example: "Um dos melhores jogos que já joguei.",
            },
            nota: {
              type: "number",
              example: 9.5,
            },
            dataCriacao: {
              type: "string",
              format: "date-time",
              example: "2026-06-22T10:00:00Z",
            },
          },
        },

        ReviewInput: {
          type: "object",
          required: ["userId", "gameId", "comentario"],
          properties: {
            userId: {
              type: "integer",
              example: 1,
            },
            gameId: {
              type: "integer",
              example: 2,
            },
            comentario: {
              type: "string",
              example: "Um dos melhores jogos que já joguei.",
            },
            nota: {
              type: "number",
              example: 9.5,
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
