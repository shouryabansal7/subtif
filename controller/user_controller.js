const User = require("../models/users");

module.exports.SignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Amico | Sign In",
  });
};

module.exports.SignUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Amico | Sign Up",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(
        {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          isAdmin: false,
          subscriptionStatus: 0,
          password: req.body.password,
        },
        function (err, user) {
          console.log(req.body);
          if (err) {
            console.log("error is creating the user while signing up");
            console.log("******", err);
            return;
          }
          return res.redirect("/users/sign-in");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

//to Sign In
module.exports.createSession = function (req, res) {
  //TODO
  return res.redirect("/");
};

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "Profile",
    user: req.user,
  });
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};
