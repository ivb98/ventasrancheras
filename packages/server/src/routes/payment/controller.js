const Payment = require("../../erp/Payment/Payment");

module.exports.createPayment = async (req, res, next) => {
    try {
        const { totalAmt, customerId } = req.body;
        console.log(totalAmt, customerId);
        await Payment.createPayment({
            TotalAmt: totalAmt,
            CustomerRef: {
                value: customerId,
            },
        });
        console.log("basinga");
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        next(new Error("There was an error processing the payment."));
    }
};
