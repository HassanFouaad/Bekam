const express = require("express");
const router = express.Router();
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  createOrder,
  orderList,
  getStatusValue,
  orderById,
  updateStatus,
} = require("../controllers/order");
const { userOrderHistory, purchasesByUser } = require("../controllers/user");
const { decreaseOrderQuantity } = require("../controllers/product");

router.post(
  "/order/create/:userId",
  requireSignIn,
  isAuth,
  userOrderHistory,
  createOrder
);

router.get("/order/list/:userId", requireSignIn, isAuth, isAdmin, orderList);
router.put(
  "/order/:orderId/status/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  updateStatus
);
router.put(
  "/order/:orderId/shipped/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  decreaseOrderQuantity
);
router.get(
  "/order/status-value/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  getStatusValue
);
router.get("/orders/by/user/:userId", purchasesByUser);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
