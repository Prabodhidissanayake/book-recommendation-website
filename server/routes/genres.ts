const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const genres = ['Romance', 'History', 'Science Fiction', 'Fiction'];
  return res.set('Content-Type', 'application/json').status(200).json(genres);
});

export default router;
