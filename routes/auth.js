const express = require("express");
const {
  validate,
  userSignUpValidator,
  userSigninValidator
} = require("../validator/index");
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
router.post("/signin",userSigninValidator(),validate, signIn);
/* --- SignOut- */
router.get("/signout", signOut);
router.get("/users");

module.exports = router;
