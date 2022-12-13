const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  thumnail: {
    type: String,
  },
  quality: {
    type: Number,
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
