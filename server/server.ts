const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/books/:text', async (req, res) => {
  const { text } = req.params;
  const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`);
  const titles = books.data.items.map(book => book.volumeInfo.title);
  console.log(titles);
  res.send(titles);
});

app.get('/books', async (req, res) => {
  // const { text } = req.params;
  const books = await axios.get('https://www.googleapis.com/books/v1/volumes?q=cat');
  const titles = books.data.items.map(book => book.volumeInfo.title);
  console.log(titles);
  res.send(titles);
});

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
