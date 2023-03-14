import { addReview } from '../reviews/index';
import Review from '../types/review';

const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
  const { rating, comment } = req.body;
  const newReview = await addReview(rating, comment);
  return res
  .set('location', `/api/preferences/${newReview._id}`)
  .set('Content-Type', 'application/json')
  .status(201)
  .json(newReview);

});

export default router;
