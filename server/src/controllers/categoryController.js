const Category = require("../models/category");

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.getOneCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new Error("Category not found!");
    }
    res.status(200).send(category);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const data = req.body;
    const checkSlug = await Category.findOne({ slug: data.slug });
    if (checkSlug) {
      throw new Error("Slug alreadly exists!");
    }
    const newCategory = new Category(data);
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    const data = req.body;

    if (!category) {
      throw new Error("Category not found!");
    }
    const updateCategory = await Category.findByIdAndUpdate(
      { _id: category._id },
      data,
      { new: true }
    );

    res.status(200).send(updateCategory);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      throw new Error("Category not found!");
    }
    await category.delete();
    res.status(200).send(category);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

