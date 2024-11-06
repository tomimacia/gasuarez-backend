import express from 'express';
import { propiedades } from './propiedades.js';
import cors from 'cors';
import { status } from './status.js';
const app = express();

const port = process.env.PORT || 4000;
app.use(cors());
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/propiedades', (req, res) => {
  propiedades(req, res);
});
app.get('/status', (req, res) => {
  status(req, res);
});
