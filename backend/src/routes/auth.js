import { Router } from "express";
import { authController } from "../controllers/authController.js";

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário pelo e-mail e senha
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: ana@uepb.br
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post("/login", authController.login);

export default router;
