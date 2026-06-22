import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";

const router = Router();

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Lista todas as reviews
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Lista de reviews retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Review"
 */
router.get("/", reviewController.listarTodos);

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     summary: Busca uma review pelo ID
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 *       404:
 *         description: Review não encontrada
 */
router.get("/:id", reviewController.buscarPorId);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Cria uma nova review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewInput"
 *     responses:
 *       201:
 *         description: Review criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário ou jogo não encontrado
 */
router.post("/", reviewController.criar);

/**
 * @openapi
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza uma review
 *     tags:
 *       - Reviews
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
 *             $ref: "#/components/schemas/ReviewInput"
 *     responses:
 *       200:
 *         description: Review atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 *       404:
 *         description: Review não encontrada
 */
router.put("/:id", reviewController.atualizar);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Remove uma review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Review removida com sucesso
 *       404:
 *         description: Review não encontrada
 */
router.delete("/:id", reviewController.remover);

export default router;
