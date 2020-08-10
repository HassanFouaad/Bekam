const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const { createCategory } = require("../controllers/category");
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
router.post(
  "/category/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  createCategory
);
router.param("userId", userById);
module.exports = router;
