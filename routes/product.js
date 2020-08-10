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
router.param("userId", userById);
router.param("productId", productById);
module.exports = router;
