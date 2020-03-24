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
    return new Promise((resolve, reject) => {
        qbo.createPayment(payment, (err, paymentInfo) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(paymentInfo);
            }
        });
    });
};
