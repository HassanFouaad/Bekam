const express = require("express");
const router = express.Router();
const {
  requireSignIn,
  isAdmin,
  isAuth,
  signOut,
} = require("../controllers/auth");
const {
  userById,
  displayProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/user");
//---------------Routers-----------------//
/* --- UserById-- */
router.get("/secret/:userId", requireSignIn, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/profile/:userId", displayProfile);
router.put("/profile/:userId", updateProfile);
router.delete("/profile/:userId", signOut, deleteProfile);

router.param("userId", userById);
module.exports = router;
