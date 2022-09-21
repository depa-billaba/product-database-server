const Product = require('./schemas/Product');

module.exports = {
  getPage: async function(page, count) {
    const index = (count * page) - count + 1;
    const response = await Product.find({id: {'$gte': index}}).limit(count);
    if(response === null) return null;
    response.forEach(product => {
      product.styles = undefined;
      product.related = undefined;
      product.features = undefined;
    })
    return response;
  },
  getOne: async function (id) {
    const product = await Product.findOne({ id });
    if (product === null) return null;
    (product._id = undefined), (product.styles = undefined);
    product.related = undefined;
    product.__v = undefined;
    return product;
  },
  getStyles: async function (id) {
    let hello = 'hello';
    const product = (await Product.findOne({ id }));
    if(hello === 'hello') console.log('hello');
    if (product === null) return null;
    return {
      product_id: id,
      results: product.styles,
    };
  },
  getRelated: async function (id) {
    const product = await Product.findOne({id});
    if (product === null) return null;
    return product.related;
  }
};
