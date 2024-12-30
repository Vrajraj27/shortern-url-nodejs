const express = require("express");
const router = express.Router();

const authController = require("../controller/auth.controller");

router.get("/google", authController.googleSignUpSignIn);

module.exports = router;
