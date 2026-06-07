import { Router } from "express";
import { reviewController } from "../controllers/reviewController.js";

const router = Router();

router.get("/", reviewController.listarTodos);
router.get("/:id", reviewController.buscarPorId);
router.post("/", reviewController.criar);
router.put("/:id", reviewController.atualizar);
router.delete("/:id", reviewController.remover);

export default router;
