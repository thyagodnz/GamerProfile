import { Router } from "express";
import { gameController } from "../controllers/gameController.js";

const router = Router();

/**
 * @openapi
 * /games:
 *   get:
 *     summary: Lista todos os jogos cadastrados
 *     tags:
 *       - Games
 *     responses:
 *       200:
 *         description: Lista de jogos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Game"
 */
router.get("/", gameController.listarTodos);

/**
 * @openapi
 * /games/{id}:
 *   get:
 *     summary: Busca um jogo pelo ID
 *     tags:
 *       - Games
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
 *       404:
 *         description: Jogo não encontrado
 */
router.get("/:id", gameController.buscarPorId);

/**
 * @openapi
 * /games:
 *   post:
 *     summary: Cadastra um novo jogo
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/GameInput"
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Já existe um jogo com esse título
 */
router.post("/", gameController.criar);

/**
 * @openapi
 * /games/{id}:
 *   put:
 *     summary: Atualiza um jogo
 *     tags:
 *       - Games
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
 *             $ref: "#/components/schemas/GameInput"
 *     responses:
 *       200:
 *         description: Jogo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Game"
 *       404:
 *         description: Jogo não encontrado
 */
router.put("/:id", gameController.atualizar);

/**
 * @openapi
 * /games/{id}:
 *   delete:
 *     summary: Remove um jogo
 *     tags:
 *       - Games
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Jogo removido com sucesso
 *       404:
 *         description: Jogo não encontrado
 */
router.delete("/:id", gameController.remover);

export default router;
