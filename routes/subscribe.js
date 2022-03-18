const express = require("express");
const router = express.Router();
const ensureStatus = require("../helpers/auth").ensureStatus;
const subscribeController = require("../controller/subscribe_controller");

router.get("/", ensureStatus, subscribeController.getSubs);

router.post("/", ensureStatus, subscribeController.postSubs);

module.exports = router;
