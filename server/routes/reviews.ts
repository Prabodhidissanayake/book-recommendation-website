import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
} from '../reviews/index';

const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  const { bookId, rating, comment } = req.body;
  const newReview = await addReview(bookId, rating, comment);

  return res
    .set('location', `/api/reviews/${newReview._id}`)
    .set('Content-Type', 'application/json')
    .status(201)
    .json(newReview);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);

  if (!review) {
    return res.status(204).end();
  }
  return res
    .set('location', `/api/reviews/${review._id}`)
    .set('Content-Type', 'application/json')
    .status(200)
    .json(review);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await updateReview(id, rating, comment);

  if (!review) {
    return res.status(204).end();
  }
  return res
    .set('location', `/api/reviews/${review._id}`)
    .set('Content-Type', 'application/json')
    .status(200)
    .json(review);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteReview(id);
  return res.status(204).end();
});
export default router;
