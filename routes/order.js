const express = require("express");
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createOrder, orderList } = require("../controllers/order");
const { userOrderHistory } = require("../controllers/user");
const { decreaseOrderQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignIn,
  isAuth,
  userOrderHistory,
  decreaseOrderQuantity,
  createOrder
);

router.get("/order/list/:userId", requireSignIn, isAuth, isAdmin, orderList);

router.param("userId", userById);

module.exports = router;
