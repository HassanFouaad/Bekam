const express = require("express");
const router = express.Router();
const { requireSignIn, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
//---------------Routers-----------------//
/* --- UserById-- */
router.get("/secret/:userId", requireSignIn, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.param("userId", userById);
module.exports = router;
