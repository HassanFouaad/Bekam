const User = require("../models/user");

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
