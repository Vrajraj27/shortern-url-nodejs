const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const urlRouter = require("./url.router");
const analyticsRouter = require("./analytics.router");

router.use("/auth", authRouter);
router.use("/shorten", urlRouter);
router.use("/analytics", analyticsRouter);

module.exports = router;
