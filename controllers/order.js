const { Order, CartItem } = require("../models/Order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createOrder = (req, res) => {
  console.log("order request", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    console.log(data);
    res.json(data);
  });
};

exports.orderList = (req, res) => {
  Order.find()
    .populate("user", "_id name address amount count")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(orders);
    });
};
