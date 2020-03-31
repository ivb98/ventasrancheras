const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { getItems } = require("./controller");

const router = Router();

router.get("/", validateToken, getItems);

module.exports = router;
