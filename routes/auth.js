const express = require("express");
const { validate, userSignUpValidator } = require("../validator/index");
const router = express.Router();
const {
  signUp,
  signIn,
  signOut,
  requireSignIn,
} = require("../controllers/auth");
//---------------Routers-----------------//
/* --- SignUp -- */
router.post("/signup", userSignUpValidator(), validate, signUp, signIn);
/* --- SignIn-- */
router.post("/signin", signIn);
/* --- SignOut- */
router.post("/signout", signOut);
router.get("/users");

module.exports = router;
