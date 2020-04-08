const { Router } = require("express");
const { login, getEmployee } = require("./controller");
const { validateToken } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", login);
router.get("/", validateToken, getEmployee);

module.exports = router;
