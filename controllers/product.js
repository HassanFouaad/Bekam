const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");
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
      response.photo = undefined;
      res.json({
        message: `${response.name} has been created successfully`,
        response,
      });
    });
  });
};

/* ---------------------------------------------Product By Id */
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

/* ---------------------------------------------Product Show*/

exports.showSingleProduct = (req, res) => {
  req.product.photo = undefined;
  const product = req.product;
  return res.json({ product });
};

/* ---------------------------------------------Product Delete*/

exports.deleteSingleProduct = (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: "Product Not Found!" });
    }
    res.status(200).json({ message: "Product has been successfully deleted!" });
  });
};

/* ---------------------------------------------Product Update*/

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
//****
//***************
/* ----------------------------Best Selling and New Arrival --------
 $By Sell = /product?sortBy=sold&order=desc&limit=4
 $By Arrival = /product?sortBy=createdAt&order=desc&limit=4
 $ If no params send , All Products will be Returned  
//*************** 
*/

exports.productList = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({ error: "Products not found" });
      }
      res.status(200).json({ products });
    });
};
/* ------------------------- Finding-Porducts based on Category -------- */
exports.productListRealated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({ error: "Products not found" });
      }
      res.status(200).json({ products });
    });
};
