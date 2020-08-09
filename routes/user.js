const express = require("express");
const { validate, userSignUpValidator } = require("../validator/index");
const router = express.Router();
const { signUp } = require("../controllers/user");
//Routers
router.post("/signup", userSignUpValidator(), validate, signUp);

module.exports = router;
