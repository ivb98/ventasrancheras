const express = require("express");
const Auth = require("./Auth/authToken.controller");
const { quickBooks } = require("../../config/index");

const router = express.Router();

router.get("/activate", Auth.setAuthUri);
router.get(`${quickBooks.redirectEndpoint}`, Auth.handleRedirect);

module.exports = router;
