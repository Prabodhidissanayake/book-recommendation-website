import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import preferencesRouter from './routes/preferences';
import genresRouter from './routes/genres';
import books from './routes/books';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.use('/api/preferences', preferencesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/books', books);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on localhost:${PORT}`);
});
