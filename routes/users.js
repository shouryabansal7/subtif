const express = require("express");
const router = express.Router();

const userController = require("../controller/user_controller");

router.get("/profile", userController.profile);
router.get("/sign-up", userController.SignUp);
router.get("/sign-in", userController.SignIn);

router.post("/create", userController.create);
router.post("/create-session", userController.createSession);

module.exports = router;
