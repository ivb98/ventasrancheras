const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { getCustomers } = require("./controller");

const router = Router();

router.get("/", validateToken, getCustomers);

module.exports = router;
