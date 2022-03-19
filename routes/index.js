const express = require("express");
const router = express.Router();

const homeController = require("../controller/home_controller");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/", ensureGuest, homeController.home);
router.post("/leaves", ensureAuthenticated, homeController.submitLeaves);
router.get("/leaves/:month?", ensureAuthenticated, homeController.monthLeaves);
router.get("/dashboard/:month?", ensureAuthenticated, homeController.forMonth);

router.use("/users", require("./users"));
router.use("/subscribe", require("./subscribe"));
router.use("/admin", require("./admin"));
// router.use("/subscribe", require("./subscribe"));
// router.use("/admin", require("./admin"));

module.exports = router;
