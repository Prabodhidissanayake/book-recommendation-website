import { addPreference } from '../preferences/index';
import Preference from '../types/preference';

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { genres } = req.body;
  const preference: Preference = {
    genres,
  };

  const savedPreference = await addPreference(preference);

  return res
    .set('location', `/api/preferences/${savedPreference._id}`)
    .set('Content-Type', 'application/json')
    .status(201)
    .json(savedPreference);
});

module.exports = router;
