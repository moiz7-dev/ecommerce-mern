const { Router } = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, deleteReview, getProductReviews } = require('../controllers/product');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = Router();

router.route('/products').get(getAllProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/product/:id').get(getSingleProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;