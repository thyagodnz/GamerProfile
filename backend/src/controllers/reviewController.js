import { reviewService } from "../services/reviewService.js";

export const reviewController = {
  listarTodos(req, res) {
    const reviews = reviewService.listarTodos();

    res.json(reviews);
  },

  buscarPorId(req, res) {
    const review = reviewService.buscarPorId(Number(req.params.id));

    res.json(review);
  },

  criar(req, res) {
    const review = reviewService.criar(req.body);

    res.status(201).json(review);
  },

  atualizar(req, res) {
    const review = reviewService.atualizar(Number(req.params.id), req.body);

    res.json(review);
  },

  remover(req, res) {
    reviewService.remover(Number(req.params.id));

    res.status(204).end();
  },
};
