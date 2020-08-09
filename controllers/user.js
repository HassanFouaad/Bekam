const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { response } = require("express");

exports.signUp = (req, res) => {
  console.log("Req body: ", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }
      user.salt = undefined
      user.hashed_password = undefined
      user.role = undefined
    res.status(200).json({ user });
  });
};
