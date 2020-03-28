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
                let myCustomers = customers.QueryResponse.Customer.filter(
                    customer => !!customer.BillAddr === true
                );
                myCustomers = myCustomers.map(customer => {
                    return {
                        id: customer.Id,
                        shipAddr: {
                            lat: 0,
                            long: 0,
                            stringified: `${customer.BillAddr.City}, ${customer.BillAddr.CountrySubDivisionCode}, ${customer.BillAddr.Line1}`,
                        },
                        balance: customer.Balance,
                        displayName: customer.DisplayName,
                    };
                });
                resolve(myCustomers);
            }
        });
    });
};
