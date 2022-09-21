const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const database = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;
const DATABASEIP = process.env.DATABASEIP || 'localhost';

app.use(morgan('dev'));

const run = () => {main().catch(err => {
  console.log(err);
  run();
})}

run();

async function main() {
  console.log('Connecting to database')
  await mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPW}@${DATABASEIP}:27017/products`);
  console.log('Connected to database');

  app.get('/products', async (req, res) => {
    const page = Number(req.query.page) || 1;
    let count = Number(req.query.count) || 5;
    if(count > 20) count = 20;
    const response = await database.getPage(page, count);
    if (response === null) {
      res.status(404);
      res.send('Product not found');
      return;
    }
    res.status(200);
    res.send(response);
  });

  app.get('/:id/styles', async (req, res) => {
    const response = await database.getStyles(req.params.id);
    if (response === null) {
      res.status(404);
      res.send('Product not found');
      return;
    }
    res.status(200);
    res.send(response);
  });

  app.get('/:id/related', async (req, res) => {
    const response = await database.getRelated(req.params.id);
    if (response === null) {
      res.status(404);
      res.send('Product not found');
      return;
    }
    res.status(200);
    res.send(response);
  });

  app.listen(PORT, () => {
    console.log(`Products database listening on port ${PORT}`);
  });
}
