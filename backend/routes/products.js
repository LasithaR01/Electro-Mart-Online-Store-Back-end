const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');

/* GET All Products */
router.get('/', async (req, res) => {
  try {
    // Example SQL query to fetch all products
    const query = 'SELECT * FROM products';
    const products = await database.executeQuery(query);

    if (products.length > 0) {
      res.status(200).json({
        success: true,
        products: products,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No products found',
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;
