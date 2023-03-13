import express from 'express';
import { addPreference, getPreference } from '../preferences/index';
import Preference from '../types/preference';

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

router.get('/', async (req, res) => {
  const preference = await getPreference();

  if (!preference) {
    return res.status(204).end();
  }

  return res
    .set('Content-Type', 'application/json')
    .status(200)
    .json(preference);
});

export default router;
