const express = require("express");
const router = express.Router();

const apiRouter = require("./router/router");

router.use("/api", apiRouter);

module.exports = router;
