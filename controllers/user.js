const User = require("../models/user");
const { Order } = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found!",
      });
    }
    {
      req.profile = user;
      next();
    }
  });
};

/*                       Displaying Profile                    */

exports.displayProfile = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile_id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not Found!",
        });
      }
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;
      res.json(user);
    }
  );
};

exports.deleteProfile = (req, res) => {
  const user = req.profile;
  User.findByIdAndDelete(user._id, (err, userToDelete) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found!",
      });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  });
};

exports.userOrderHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      amount: req.body.order.amout,
    });
  });
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (err, data) => {
      if (err) {
        res.status(500).json({ error: "Couldn't update use Purchase history" });
      }
      console.log(data);
      next();
    }
  );
};

exports.purchasesByUser = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        console.err(err);
        res.json({ error: errorHandler(err) });
      } else {
        res.json(orders);
      }
    });
};
