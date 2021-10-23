const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product');

const router = Router();

router.route('/products').get(getAllProducts);

router.route('/product/new').post(createProduct);

router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getSingleProduct); 

module.exports = router;