import express from 'express';
import { propiedades } from './propiedades.js';
const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/propiedades', (req, res) => {
  propiedades(req, res);
});
