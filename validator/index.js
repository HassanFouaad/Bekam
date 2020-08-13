const { body, validationResult } = require("express-validator");

const userSignUpValidator = () => {
  return [
    body("firstname", "First name is required!")
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage("First Name Should be between 2 to 5 characters"),
    body("lastname", "Last name is required!")
      .notEmpty()
      .isLength({ min: 2, max: 15 })
      .withMessage("Last Name Should be between 2 to 5 characters"),
    body("email", "Email is required")
      .notEmpty()
      .withMessage("Please Enter your Email")
      .isEmail()
      .withMessage("Please Enter a valid Email Address"),
    body("password", "Password is required").notEmpty(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
  ];
};
const userSigninValidator = () => {
  return [
    body("email", "Email is required")
      .notEmpty()
      .withMessage("Please Enter your Email")
      .isEmail()
      .withMessage("Please Enter a valid Email Address"),
    body("password", "Password is required")
      .notEmpty()
      .withMessage("Please Enter Password"),
  ];
};
const validate = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    return res.status(400).json({ error: result.array()[0] });
  }
  return next();
};
module.exports = {
  userSignUpValidator,
  userSigninValidator,
  validate,
};
