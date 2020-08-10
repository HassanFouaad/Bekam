const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
router.param("userId", userById);

router.get("/product/:userId", requireSignIn, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });

  router.param("userId", userById);
});
module.exports = router;
