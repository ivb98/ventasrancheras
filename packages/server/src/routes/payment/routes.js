const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { createPayment } = require("./controller");

const router = Router();

router.post("/", validateToken, createPayment);

module.exports = router;
