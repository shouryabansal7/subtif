const express = require("express");
const router = express.Router();

const homeController = require("../controller/home_controller");

router.get("/", homeController.home);

router.use("/users", require("./users"));
router.use("/subscribe", require("./subscribe"));
// router.use("/subscribe", require("./subscribe"));
// router.use("/admin", require("./admin"));

module.exports = router;
