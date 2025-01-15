const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* GET All Products */
router.get('/', (req, res) => {
  let page = (req.query.page !== undefined && req.query.page !== 0) ? parseInt(req.query.page) : 1; // Set the current page number
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? parseInt(req.query.limit) : 10; // Set the limit of items per page

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = (page * limit) - limit; // Calculate start value for the LIMIT clause
    endValue = page * limit; // Calculate end value
  } else {
    startValue = 0;
    endValue = 10;
  }

  // Fetch products from the database
  database.table('products as p')
    .join([
      {
        table: 'categories as c',
        on: 'c.id = p.cat_id'
      }
    ])
    .withFields(['p.id', 'p.name', 'p.description', 'p.price', 'p.stock', 'c.name as category'])
    .slice(startValue, endValue) // Apply pagination
    .sort({ id: 1 }) // Optional: Sort by ID in ascending order
    .getAll()
    .then(products => {
      if (products.length > 0) {
        res.status(200).json({
          count: products.length,
          products: products
        });
      } else {
        res.status(404).json({ message: 'No products found' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
