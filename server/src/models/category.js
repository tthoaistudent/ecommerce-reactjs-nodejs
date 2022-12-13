const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: [true, "Slug already exists!"],
  },
  status: {
    type: Number,
    required: true,
    default: 1,
  },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

CategorySchema.methods.addProductInCategory = async function (productId) {
  const category = this;
  if (category.products.indexOf(productId) < 0) {
    category.products.push(productId);
    category.save();
  }
};

CategorySchema.methods.removeProduct = async function(productId){
  const category = this;
  const index = category.products.indexOf(productId);
  if(index >= 0){
    category.products.splice(index, 1);
    category.save();
  }
}

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
