const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/user");
const {
  createCategory,
  categoryById,
  showCategory,
  deleteCategory,
  updateCategory,
  categoryList,
} = require("../controllers/category");

const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");

router.post(
  "/category/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  createCategory
);
router.get("/categories", categoryList);
router.get("/category/:categoryId", showCategory);
router.put("/category/:categoryId", updateCategory);
router.delete("/category/:categoryId", deleteCategory);

router.param("userId", userById);
router.param("categoryId", categoryById);
module.exports = router;
