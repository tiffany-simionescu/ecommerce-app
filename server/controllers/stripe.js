const User = require("../models/user");
const Cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  // later apply coupon
  // console.log(req.body);
  const { couponApplied } = req.body;

  // later calculate price

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({ 
    orderedBy: user._id, 
  }).exec();
  // console.log("CART TOTAL", cartTotal, "AFTER DISCOUNT", totalAfterDiscount);

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.ceil(totalAfterDiscount * 100);
  } else {
    finalAmount = Math.ceil(cartTotal * 100);
  }
  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.ceil(finalAmount),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
