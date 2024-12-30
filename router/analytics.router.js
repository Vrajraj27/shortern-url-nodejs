const express = require("express");
const router = express.Router();

const analyticsController = require("../controller/analytics.controller");
const analyticsValidator = require("../validator/analytics.validator");

router.get("/overall", analyticsController.getAnalytics);

router.get(
  "/:alias",
  analyticsValidator.getAnalyticsByAlias,
  analyticsController.getAnalyticsByAlias
);

router.get(
  "/topic/:topic",
  analyticsValidator.getAnalyticsByTopic,
  analyticsController.getAnalyticsByTopic
);

module.exports = router;
