const dashboard = require("../methods/dashboard");
const leaves = require("../methods/leaves");
const details = require("../methods/details");

module.exports.home = function (req, res) {
  return res.render("home", {
    title: "Home",
  });
};

module.exports.forMonth = function (req, res) {
  details.getHolidays({}).then((holidays) => {
    dashboard.getUserData(req.user._id).then((user) => {
      const month = dashboard.getMonth(req.params.month);
      const unpaidAmount = details.getUnpaidAmount(user, month.value, holidays);
      const totalAmount = unpaidAmount;
      const leaveList = dashboard.getLeaveFormatted(user.leaves);
      const monthList = dashboard.getMonthList();

      // let lunchPrice =

      res.render("dashboard", {
        month: month,
        // totalLunchPrice: totalLunchPrice,
        // totalDinnerPrice: totalDinnerPrice,
        totalAmount: totalAmount,
        monthList: monthList,
        leaveList: leaveList,
      });
    });
  });
};

module.exports.monthLeaves = function (req, res) {
  leaves.getUserData(req.user._id).then((user) => {
    const monthList = leaves.getMonthList();
    const month = leaves.getMonth(req.params.month);
    const dateList = leaves.getDateList(month.value);
    // console.log(dateList);
    const leaveList = dashboard.getLeaveFormatted(user.leaves);
    res.render("leaves", {
      month: month,
      monthList: monthList,
      dateList: dateList,
      leaveList: leaveList,
    });
  });
};

module.exports.submitLeaves = function (req, res) {
  leaves.submitLeave(req, res, "/leaves");
};
