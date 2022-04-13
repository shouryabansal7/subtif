const moment = require("moment");
const admin = require("../methods/admin");
const details = require("../methods/details");
const dashboard = require("../methods/dashboard");
const leaves = require("../methods/leaves");
const { redirect } = require("express/lib/response");

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

module.exports.getHolidays = (req, res) => {
  details.getHolidays({}).then((holidays) =>
    res.render("holidays", {
      holidays: holidays,
      currentDate: details.getCurrentDate(),
    })
  );
};

module.exports.addHolidays = (req, res) => {
  if (req.body.date && req.body.title && req.body.description) {
    details.addHolidays(req.body.date, req.body.title, req.body.description);
  }
  res.redirect("/admin/holidays");
};

module.exports.deleteHolidays = (req, res) => {
  console.log("Holiday ID", req.body.holidayId);
  if (req.body.holidayId) {
    details.deleteHoliday(req.body.holidayId);
  }
  res.redirect("/admin/holidays");
};

module.exports.getExpense = (req, res) => {
  console.log("req", req.params);
  const monthList = dashboard.getMonthList(true);
  month = !req.params.month ? dashboard.getMonth(null).value : req.params.month;
  console.log("month".month);
  details.getExpenses(month).then((expenses) => {
    res.render("expense", {
      monthList: monthList,
      expenses: expenses,
      currentDate: details.getCurrentDate(),
    });
  });
};

module.exports.addExpense = (req, res) => {
  if (req.body.amount && req.body.description) {
    details.addExpense(req.body.date, req.body.description, req.body.amount);
  }
  res.redirect("/admin/expense");
};

module.exports.deleteExpense = (req, res) => {
  if (req.body.expenseId) {
    details.deleteExpense(req.body.expenseId);
  }
  res.redirect("/admin/expense");
};

module.exports.getLeaveList = (req, res) => {
  dashboard.getUserData(req.params.id).then((user) => {
    if (user) {
      const leaveList = dashboard.getLeaveFormatted(user.leaves);
      res.render("manage-guest-leaves", {
        userDetails: user,
        leaveList: leaveList,
        currentDate: details.getCurrentDate(),
      });
    } else {
      res.redirect("/admin/manage-guests");
    }
  });
};

module.exports.guestLeaves = (req, res) => {
  if (req.body.userID && req.body.date) {
    const newDate = moment(req.body.date);
    req.body.date = newDate.date();
    req.body.month = newDate.month() + 1;
    leaves.submitLeave(
      req,
      res,
      "/admin/manage-guests/leaves/" + req.body.userID
    );
  } else {
    res.redirect("/admin/manage-guests");
  }
};

module.exports.addGuests = (req, res) => {
  console.log("req", req.body);
  if (req.body.email && req.body.firstName && req.body.lastName) {
    details.addGuest(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      res
    );
  }
};

module.exports.deleteGuests = (req, res) => {
  details.deleteGuest(req.body.userID);
  res.redirect("/admin/manage-guests");
};

module.exports.getGuests = (req, res) => {
  details.getHolidays({}).then((holidays) => {
    details.getGuests().then((users) => {
      const month = dashboard.getMonth(null);
      const userList = users.map((user) => {
        const unpaidAmount = details.getUnpaidAmount(
          user,
          month.value,
          holidays
        );
        user["amount"] = unpaidAmount;
        return user;
      });
      console.log(userList);
      res.render("manage-guests", { guests: userList });
    });
  });
};
