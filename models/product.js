const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      minlength: 3,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    onSale: {
      type: Boolean,
      default: false,
      newPrice: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 3000,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: { required: false, type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
