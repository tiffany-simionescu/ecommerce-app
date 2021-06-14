const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true, 
      index: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [
      {
        name: {
          type: String,
          required: true,
          maxlength: [32, 'Must be no more than 32 characters long'],
          minlength: [2, 'Must be at least 2 characters long'],
        },
        street: {
          type: String, 
          required: true
        },
        apt: { 
          type: String 
        },
        city: { 
          type: String, 
          required: true 
        },
        state: { 
          type: String, 
          required: true 
        },
        postalCode: { 
          type: Number, 
          required: true, 
          maxlength: [5, 'Must be 5 numbers'], 
          minlength: [5, 'Must be 5 numbers'],
        },
        country: { 
          type: String, 
          required: true,
          maxlength: [32, 'Must be no more than 32 characters long'],
          minlength: [2, 'Must be at least 2 characters long'],
        },
        postedBy: { 
          type: ObjectId, 
          ref: "User" 
        },
      },
    ],
    wishlist: [{type: ObjectId, ref: "Product"}],
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);