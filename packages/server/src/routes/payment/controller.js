const Payment = require("../../erp/Payment/Payment");

module.exports.createPayment = async (req, res, next) => {
    try {
        const { totalAmt, customerId } = req.body;
        await Payment.createPayment({
            TotalAmt: totalAmt,
            CustomerRef: {
                value: customerId,
            },
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        next(new Error("There was an error processing the payment."));
    }
};
