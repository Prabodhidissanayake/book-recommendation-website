const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { json } = require("express");
require('dotenv').config();
const preferences = require('./routes/preferences')
const genres = require('./routes/genres')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.use('/preferences',preferences);
app.use('/genres',genres);

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
