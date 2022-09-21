const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const database = require('./database')
require('dotenv').config();

const app = express();
const PORT = process.env.port || 9000;

app.use(morgan('dev'));

(async function () {
  await mongoose.connect('mongodb://localhost:27017/products');
  console.log('Connected to database');

  app.get('/products', async(req, res) => {
    const page = req.query.page;
    const count = req.query.count;
    const response = await database.getPage(page, count);
    res.status(200);
    res.send(response);
  })

  app.get('/:id/styles', async(req, res) => {
    const response = await database.getStyles(req.params.id);
    res.status(200);
    res.send(response);
  })

  app.get('/:id/related', async (req, res) => {
    const response = await database.getRelated(req.params.id);
    res.status(200);
    res.send(response);
  })

  app.listen(PORT, () => {
    console.log(`Products database listening on port ${PORT}`);
  });
})().catch((err) => console.log(err));
