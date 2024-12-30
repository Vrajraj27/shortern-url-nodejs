const express = require("express");
const router = express.Router();

const urlController = require("../controller/url.controller");
const urlValidator = require("../validator/url.validator");
const { verifyJWTToken } = require("../middleware/jwt.middleware");

router.post("/", urlValidator.addUrl, verifyJWTToken, urlController.addUrl);

router.get("/:alias", urlValidator.getUrl, urlController.getUrl);

module.exports = router;
