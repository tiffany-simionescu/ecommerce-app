const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 0);

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product'
        },
        count: Number,
        size: String, 
        color: String,
        price: Number
      },
    ],
    cartTotal: Float,
    totalAfterDiscount: Float,
    orderedBy: { 
      type: ObjectId, 
      ref: "User" 
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);