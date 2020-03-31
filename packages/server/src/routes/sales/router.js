const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const { getSalesmen, getSingleSalesman, create, assign } = require("./controller");

const router = Router();

router.get("/me", validateToken, getSingleSalesman);
router.get("/", validateToken, getSalesmen);
router.post("/", validateToken, create);
router.post("/assign", validateToken, assign);

module.exports = router;
