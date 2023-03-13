import { addPreference } from '../preferences/index';
import Preference from '../types/preference';

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = ['Romance', 'History', 'Science Fiction', 'Fiction'];
  return res.set('Content-Type', 'application/json').status(200).json(genres);
});

module.exports = router;
