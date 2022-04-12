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

module.exports = router;
