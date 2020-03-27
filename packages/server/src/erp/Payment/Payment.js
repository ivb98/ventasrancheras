const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

/**
 * @param {Object} payment`Quickbooks payment object
 * @param {number} payment.TotalAmnt Amount received in the payment.
 * @param {Object} payment.CustomerRef Reference to the customer who issued the payment
 * @param {string} payment.CustomerRef.value Quickbooks Id of the customer.
 */
module.exports.createPayment = async payment => {
    const qbo = await QBO.getQbo();
    console.log("test2");
    return new Promise((resolve, reject) => {
        qbo.createPayment(payment, (err, paymentInfo) => {
            if (err) {
                console.log(QBOUtils.parseError(err));
                reject(QBOUtils.parseError(err));
            } else {
                console.log(paymentInfo);
                resolve(paymentInfo);
            }
        });
    });
};
