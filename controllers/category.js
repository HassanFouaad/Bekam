const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

/* -------------------------------Create Category --------------------------- */
exports.createCategory = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, data) => {
    if (err || !newCategory) {
      return res.status(404).json({ error: errorHandler });
    }
    res.json({ data });
  });
};
