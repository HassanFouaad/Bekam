const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

/* -------------------------------Create Category --------------------------- */

exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, data) => {
    if (err || !newCategory) {
      return res.status(404).json({ error: errorHandler });
    }
    res.json({ data });
  });
};

/* -------------------------------Find Category by Id--------------------------- */

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not Found!",
      });
    }
    req.category = category;
    next();
  });
};
/* -------------------------------SHOW All Categories --------------------------- */

exports.categoryList = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not Found!",
      });
    }
    res.status(200).json({
      categories,
    });
  });
};

/* -------------------------------SHOW Single Category --------------------------- */

exports.showCategory = (req, res) => {
  const category = req.category;
  return res.json({ category });
};

/* -------------------------------Delete Category --------------------------- */

exports.deleteCategory = (req, res) => {
  const category = req.category;
  Category.findByIdAndDelete(category._id, (err, Categ) => {
    if (err || !Categ) {
      return res.status(404).json({ error: "Category not Found!" });
    }
    res
      .status(200)
      .json({ message: "Category has been successfully deleted!" });
  });
};

/* -------------------------------Update Category --------------------------- */

exports.updateCategory = (req, res) => {
  const category = req.category;

  category.name = req.body.name;
  category.save((err, cat) => {
    if (err || !cat) {
      return res.status(404).json({ error: "Category not Found!" });
    }
    res
      .status(200)
      .json({ message: "Category has been successfully updated!", cat });
  });
};
