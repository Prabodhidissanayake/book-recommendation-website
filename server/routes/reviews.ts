import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
} from '../reviews/index';

const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const newReview = await addReview(bookId, rating, comment);

    return res
      .set('location', `/api/reviews/${newReview.bookId}`)
      .set('Content-Type', 'application/json')
      .status(201)
      .json(newReview);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReview(id);

    if (!review) {
      return res.status(204).end();
    }
    return res
      .set('location', `/api/reviews/${review.bookId}`)
      .set('Content-Type', 'application/json')
      .status(200)
      .json(review);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.patch('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const review = await updateReview(bookId, rating, comment);

    if (!review) {
      return res.status(204).end();
    }
    return res
      .set('location', `/api/reviews/${review.bookId}`)
      .set('Content-Type', 'application/json')
      .status(200)
      .json(review);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.delete('/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    await deleteReview(bookId);
    return res.status(204).end();
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});
export default router;
