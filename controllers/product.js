const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");

/* ------------------------------------ Creating Products */
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image couldn't be Uploaded" });
    }
    //Cheaking all files
    const { name, description, price, quantity, category, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !quantity ||
      !category ||
      !shipping
    ) {
      return res
        .status(400)
        .json({ error: "Please compelete all product fields" });
    }
    let newProduct = new Product(fields);
    if (files.photo) {
      //1mb = 1000000
      if (files.photo.size > 2000000) {
        return res
          .status(400)
          .json({ error: "Image Size should be less than 2mb" });
      } else if (files.photo.size < 100000) {
        return res
          .status(400)
          .json({ error: "Image Size should be more than 100kb" });
      }
      console.log("Files Photo:" + files.photo);
      newProduct.photo.data = fs.readFileSync(files.photo.path);
      newProduct.photo.contentType = files.photo.type;
    }
    newProduct.save((err, response) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.json({ response });
    });
  });
};

/* Product By Id */
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not Found!",
      });
    }
    req.product = product;
    next();
  });
};

exports.showSingleProduct = (req, res) => {
  req.product.photo = undefined;
  const product = req.product;
  return res.json({ product });
};

exports.deleteSingleProduct = (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: "Product Not Found!" });
    }
    res.status(200).json({ message: "Product has been successfully deleted!" });
  });
};

exports.updateSingleProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image couldn't be Uploaded" });
    }
    //Cheaking all files

    let updatedProduct = req.product;
    updatedProduct = _.extend(updatedProduct, fields);
    if (files.photo) {
      //1mb = 1000000
      if (files.photo.size > 2000000) {
        return res
          .status(400)
          .json({ error: "Image Size should be less than 2mb" });
      } else if (files.photo.size < 100000) {
        return res
          .status(400)
          .json({ error: "Image Size should be more than 100kb" });
      }
      console.log("Files Photo:" + files.photo);
      updatedProduct.photo.data = fs.readFileSync(files.photo.path);
      updatedProduct.photo.contentType = files.photo.type;
    }
    updatedProduct.save((err, response) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      response.photo = undefined;
      res.json({ response });
    });
  });
};
