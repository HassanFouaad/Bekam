const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  createProduct,
  productById,
  showSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
  productList,
  productListRealated,
  productsCategriesList,
  listBySearch,
  productPhoto,
  searchForProduct,
} = require("../controllers/product");
router.param("userId", userById);
const { productValidator, validate } = require("../validator/product");

router.post(
  "/product/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  createProduct,
  productValidator(),
  validate
);
router.get("/product/:productId", showSingleProduct);
router.delete("/product/:productId", deleteSingleProduct);
router.put("/product/:productId", updateSingleProduct);

router.get("/products", productList);
router.get("/products/search", searchForProduct);
router.get("/products/related/:productId", productListRealated);
router.get("/products/categories", productsCategriesList);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", productPhoto);
router.param("userId", userById);
router.param("productId", productById);
module.exports = router;
