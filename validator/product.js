const { check, validationResult } = require("express-validator");

const productValidator = () => {
  return [
    check("name", "Product name is required!").notEmpty(),
    check("description", "Product Description is required!").notEmpty(),
    check("price", "What's your Price?")
      .notEmpty()
      .isNumeric()
      .withMessage("Price should only be a number. Isn't it?"),
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
    return res.json({ error: result.array()[0] });
  }
  return next();
};
module.exports = {
  productValidator,
  validate,
};
