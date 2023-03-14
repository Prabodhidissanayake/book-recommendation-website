// import { getRecommendations } from "../books/index";
import {
  getBookById,
  getRecommendations,
  getSearchResults,
} from '../books/index';

const express = require('express');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { title, genre } = req.query;

  if (!title && !genre) {
    return res.status(400).json('Filter critirea missing');
  }

  const searchResults = await getSearchResults(title, genre);

  if (!searchResults) {
    return res.status(204).end();
  }
  return res
    .set('Content-Type', 'application/json')
    .status(200)
    .json(searchResults);
});

router.get('/recommendations', async (_req, res) => {
  const recommendations = await getRecommendations();
  if (!recommendations) {
    return res.status(204).end();
  }
  return res
    .set('Content-Type', 'application/json')
    .status(200)
    .json(recommendations);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const book = await getBookById(id);
  if (!book) {
    return res.status(204).end();
  }
  return res
    .set('location', `/api/books/${id}`)
    .set('Content-Type', 'application/json')
    .status(200)
    .json(book);
});

export default router;
