const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { getPackages } = require("./controller.js");

const router = Router();

router.get("/", validateToken, getPackages);

module.exports = router;
