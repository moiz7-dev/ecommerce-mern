const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/product');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = Router();

router.route('/products').get( getAllProducts );

router.route('/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct).get(getSingleProduct); 

module.exports = router;