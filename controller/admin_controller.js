const moment = require("moment");
const admin = require("../methods/admin");
const details = require("../methods/details");
const dashboard = require("../methods/dashboard");
const leaves = require("../methods/leaves");

module.exports.getList = (req, res) => {
  const userList = admin.getUserList({}).then((users) => {
    const pendingApprovals = admin.getPendingApprovals(users).length;
    const month = dashboard.getMonth(null).value;
    details.getExpenses(month).then((expenses) => {
      let totalExpense = 0;
      expenses.forEach((expense) => (totalExpense += expense.amount));
      res.render("admin", {
        pendingApprovals: pendingApprovals,
        totalExpense: totalExpense,
      });
    });
  });
};

module.exports.getSubscribers = (req, res) => {
  const userList = admin.getUserList({}).then((users) => {
    const subscribers = admin.getSubscribers(users);
    const pendingApprovals = admin.getPendingApprovals(users);
    res.render("subscription", {
      subscribers: subscribers,
      pendingApprovals: pendingApprovals,
    });
  });
};

module.exports.cancelSub = (req, res) => {
  if (req.body.userID) {
    admin.cancelSubscription(req.body.userID);
  }
  res.redirect("/admin/subscriptions");
};

module.exports.approval = (req, res) => {
  console.log("User", req.body.userID);
  if (req.body.userID && req.body.status) {
    if (req.body.status === "true") {
      admin.approveSubscription(req.body.userID);
    } else if (req.body.status === "false") {
      admin.rejectSubscription(req.body.userID);
    }
  }
  res.redirect("/admin/subscriptions");
};

module.exports.paymentUpdate = (req, res) => {
  if (req.body.userID && req.body.amount) {
    details.updatePayment(req.body.userID, req.body.amount);
  }
  res.redirect("/admin/payment");
};

module.exports.payment = (req, res) => {
  details.getHolidays({}).then((holidays) => {
    admin.getUserList({ subscriptionStatus: 1 }).then((users) => {
      const month = dashboard.getMonth(req.params.month);
      const userList = users.map((user) => {
        const unpaidAmount = details.getUnpaidAmount(
          user,
          month.value,
          holidays
        );
        const totalAmount = unpaidAmount;
        user["amount"] = totalAmount;
        return user;
      });
      res.render("payment", {
        userList: userList,
      });
    });
  });
};
