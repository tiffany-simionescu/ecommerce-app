const express = require('express');
const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth');
// controllers
const { 
  userCart, 
  getUserCart,
  emptyCart,
  saveAddress,
  getUserAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder
} = require('../controllers/user');

router.post('/user/cart', authCheck, userCart); // save cart
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);
router.post('/user/order', authCheck, createOrder); // stripe
router.post('/user/cash-order', authCheck, createCashOrder); // COD
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/cart', authCheck, getUserCart);
router.get('/user/address', authCheck, getUserAddress);
router.get('/user/orders', authCheck, orders);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);
router.delete('/user/cart', authCheck, emptyCart);

module.exports = router;