const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

/**
 * Gets customers.
 */
module.exports.getCustomers = async () => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.findCustomers({ Active: true }, (err, customers) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                const myCustomers = customers.QueryResponse.Customer.map(customer => {
                    return {
                        Id: customer.Id,
                        shipAddr: customer.ShipAddr,
                        displayName: customer.DisplayName,
                    };
                });
                resolve(myCustomers);
            }
        });
    });
};
