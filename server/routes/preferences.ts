import express from 'express';
import {
  addPreference,
  getPreference,
  updateGenres,
} from '../preferences/index';

const router = express.Router();

router.post('/', async (req, res) => {
  const { genres } = req.body;
  const savedPreference = await addPreference(genres);

  return res
    .set('location', `/api/preferences/${savedPreference._id}`)
    .set('Content-Type', 'application/json')
    .status(201)
    .json(savedPreference);
});

router.get('/', async (_req, res) => {
  const preference = await getPreference();

  if (!preference) {
    return res.status(204).end();
  }

  return res
    .set('Content-Type', 'application/json')
    .status(200)
    .json(preference);
});

router.patch('/', async (req, res) => {
  const { genres } = req.body;
  const updatedPreference = await updateGenres(genres); return res
    .set('location', `/api/preferences/${updatedPreference._id}`)
    .set('Content-Type', 'application/json')
    .status(200)
    .json(updatedPreference);
});

export default router;
