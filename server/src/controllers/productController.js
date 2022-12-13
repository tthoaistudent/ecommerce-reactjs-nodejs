const Product = require("../models/product");
const Category = require("../models/category");

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;
    const idCategory = req.body.category;
    const category = await Category.findById(idCategory);

    const newProduct = new Product(data);
    await newProduct.save();
    await category.addProductInCategory(newProduct._id);
    res.status(201).send(newProduct);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").exec();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found!!");
    }
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found!");
    }
    const category = await Category.findById(product.category);

    await product.delete();
    await category.removeProduct(product._id);
    await res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const idCategory = req.body.category;

    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new Error("Product not found!");
    }

    const categoryOld = await Category.findById(product.category);
    const categoryNew = await Category.findById(idCategory);
    await categoryOld.removeProduct(product._id);
    await categoryNew.addProductInCategory(product._id);
    const productUpdate = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      data,
      { new: true }
    );
    res.status(200).send(productUpdate);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
