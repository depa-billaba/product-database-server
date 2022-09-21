const mongoose = require('mongoose');
const {styleSchema} = require('./Style.js');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: Array,
  styles: Array,
  related: Array,
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;