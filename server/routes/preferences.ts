import express from 'express';
import {
  addPreference,
  getPreference,
  updateGenres,
} from '../preferences/index';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { genres } = req.body;
    const savedPreference = await addPreference(genres);

    return res
      .set('location', `/api/preferences/${savedPreference._id}`)
      .set('Content-Type', 'application/json')
      .status(201)
      .json(savedPreference);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.get('/', async (_req, res) => {
  try {
    const preference = await getPreference();

    if (!preference) {
      return res.status(204).end();
    }

    return res
      .set('Content-Type', 'application/json')
      .status(200)
      .json(preference);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

router.patch('/', async (req, res) => {
  try {
    const { genres } = req.body;
    const updatedPreference = await updateGenres(genres);
    return res
      .set('location', `/api/preferences/${updatedPreference._id}`)
      .set('Content-Type', 'application/json')
      .status(200)
      .json(updatedPreference);
  } catch (e) {
    return res
      .set('Content-Type', 'application/json')
      .status(500)
      .json('Something went wrong');
  }
});

export default router;
