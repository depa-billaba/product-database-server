const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  style_id: {
    type: Number,
    unique: true,
    index: true,
  },
  productId: Number,
  name: String,
  original_price: String,
  sale_price: String,
  'default?': Boolean,
  photos: Array,
  skus: {},
})

const Style = mongoose.model('Style', styleSchema);

module.exports.Style = Style;
module.exports.styleSchema = styleSchema;