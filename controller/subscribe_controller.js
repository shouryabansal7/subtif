const User = require("../models/users");
const mongoose = require("mongoose");

module.exports.getSubs = function (req, res) {
  console.log("subscribe page");
  User.findOne({ _id: req.user._id }).then((user) => {
    if (user.subscriptionStatus === 1) {
      res.redirect("/dashboard");
    } else if (user.subscriptionStatus === 0) {
      res.render("subscribe", {
        status: "Unsubscribed",
        message: `Seems like you haven't subscribed.`,
        confirm: true,
      });
    } else if (user.subscriptionStatus === 2) {
      res.render("subscribe", {
        status: "Pending",
        message: `Your subscription is sent for approval by the admin.`,
        confirm: false,
      });
    }
  });
};

module.exports.postSubs = function (req, res) {
  User.findByIdAndUpdate(req.user._id, { subscriptionStatus: 2 }).then(
    (user) => {
      console.log(user);
      res.redirect("/subscribe");
    }
  );
};
