import { Router } from 'express';
import { gameController } from '../controllers/gameController.js';

const router = Router();

router.get('/', gameController.listarTodos);
router.get('/:id', gameController.buscarPorId);
router.post('/', gameController.criar);
router.put('/:id', gameController.atualizar);
router.delete('/:id', gameController.remover);

export default router;