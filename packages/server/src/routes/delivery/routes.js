const { Router } = require("express");
const { validateToken } = require("../../middlewares/auth.middleware");
const {
    getDeliveries,
    getSingleDelivery,
    assign,
    create,
    receive,
    deliver,
} = require("./controller");

const router = Router();

router.get("/", validateToken, getDeliveries);
router.get("/me", validateToken, getSingleDelivery);
router.post("/assign", validateToken, assign);
router.post("/create", validateToken, create);
router.post("/receive", validateToken, receive);
router.post("/deliver", validateToken, deliver);

module.exports = router;
