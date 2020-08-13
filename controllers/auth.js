const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); //Authorization Cheak

/*---------------------------//Sign Up Controller---------------------------*/
exports.signUp = async (req, res) => {
  console.log("Req body: ", req.body);
  const user = new User(req.body);
  await user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    user.role = undefined;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //Presisting the Tea Token with Expiry Date
    res.cookie("Tea", token, { expire: new Date() + 9999 });
    res.status(200).json({ token, user });
  });
};

/*---------------------------//Sign In Controller---------------------------*/

exports.signIn = (req, res) => {
  //Finding The User At First!
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "Email doesn't exists, Please Signup and try again" });
    }

    //Matching Email with Password Firstly
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Invaild Password" });
    }
    //Handling if Password Matches the Email
    else {
      //Generating The Token from JWT With UserId and Secret String
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      //Presisting the Tea Token with Expiry Date
      res.cookie("Tea", token, { expire: new Date() + 9999 });
      const { _id, email, firstname, lastname, role } = user;
      res
        .status(200)
        .json({ token, user: { _id, email, firstname, lastname, role } });
    }
  });
};
/*---------------------------//Sign OUT Controller---------------------------*/

exports.signOut = (req, res) => {
  res.clearCookie("Tea");
  res.json({ message: "Signed Out" });
};
/*-------------------------//REQUIRE SIGNIN Controller-----------------------*/
exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,

  algorithms: ["HS256"],
  userProperty: "auth",
});
/*------------------------------//is Authenticated --------------------------------*/
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "You are Lost!" });
  }
  next();
};
/*------------------------------//USER BY ID--------------------------------*/
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(400).json({ error: "Access is denied" });
  }
  next();
};
