const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Yellow", "Amber", "Golden Yellow", 
        "Golden Brown", "Red", "Red Brown", "Brown", 
        "Dark Brown"],
    },
    brand: {
      type: String,
      enum: ["Cecilio", "DZ Strad", "Mendini", 
        "Kennedy Violins", "D'Addario", "Core"],
    },
    size: {
      type: String,
      enum: ["4/4", "3/4", "1/2", "1/4", "1/8", 
        "1/10", "1/16", "16.5", "16", "15.5", 
        "15", "14", "13", "12"],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);