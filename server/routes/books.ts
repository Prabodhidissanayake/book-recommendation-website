// import { getRecommendations } from "../books/index";
import { getRecommendations } from '../books/index';

const express = require('express');

const router = express.Router();

router.get('/recommendations', async (_req, res) => {
  const recommendations = await getRecommendations();
  if (!recommendations) {
    return res.status(204).end();
  }
  return res.set('Content-Type', 'application/json').status(200).json(recommendations);
});

// router.get('/search', async (req, res) => {

// });

export default router;
