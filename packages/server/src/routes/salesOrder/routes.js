const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { create } = require("./controller");

const router = Router();

router.post("/", validateToken, create);

module.exports = router;
