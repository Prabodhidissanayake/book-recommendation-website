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

  try {
    const searchResults = await getSearchResults(title, genre);

    if (!searchResults) {
      return res.status(204).end();
    }
    return res
      .set('Content-Type', 'application/json')
      .status(200)
      .json(searchResults);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.get('/recommendations', async (_req, res) => {
  try {
    const recommendations = await getRecommendations();
    if (!recommendations) {
      return res.status(204).end();
    }
    return res
      .set('Content-Type', 'application/json')
      .status(200)
      .json(recommendations);
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
    const book = await getBookById(id);
    if (!book) {
      return res.status(204).end();
    }
    return res
      .set('location', `/api/books/${id}`)
      .set('Content-Type', 'application/json')
      .status(200)
      .json(book);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

export default router;
