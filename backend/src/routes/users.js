import { Router } from "express";
import { userController } from "../controllers/userController.js";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
router.get("/", userController.listarTodos);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", userController.buscarPorId);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserInput"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post("/", userController.criar);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserInput"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", userController.atualizar);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", userController.remover);

export default router;
