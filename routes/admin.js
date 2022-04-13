const express = require("express");
const router = express.Router();
const ensureAdmin = require("../helpers/auth").ensureAdmin;
const adminController = require("../controller/admin_controller");

router.get("/", ensureAdmin, adminController.getList);
router.get("/subscriptions", ensureAdmin, adminController.getSubscribers);
router.post("/subscriptions", ensureAdmin, adminController.cancelSub);
router.post("/subscriptions/approvals", ensureAdmin, adminController.approval);
router.post("/payment", ensureAdmin, adminController.paymentUpdate);
router.get("/payment", ensureAdmin, adminController.payment);
router.get("/holidays", ensureAdmin, adminController.getHolidays);
router.post("/holidays", ensureAdmin, adminController.addHolidays);
router.post("/holidays/delete", ensureAdmin, adminController.deleteHolidays);
router.get("/expense/:month?", ensureAdmin, adminController.getExpense);
router.post("/expense", ensureAdmin, adminController.addExpense);
router.post("/expense/delete", ensureAdmin, adminController.deleteExpense);
router.get(
  "/manage-guests/leaves/:id",
  ensureAdmin,
  adminController.getLeaveList
);
router.post("/manage-guests/leaves", ensureAdmin, adminController.guestLeaves);
router.get("/manage-guests", ensureAdmin, adminController.getGuests);
router.post("/manage-guests", ensureAdmin, adminController.addGuests);
router.post("/manage-guests/delete", ensureAdmin, adminController.deleteGuests);

module.exports = router;
