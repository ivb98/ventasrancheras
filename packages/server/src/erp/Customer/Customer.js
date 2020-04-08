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
                console.log(err);
                reject(QBOUtils.parseError(err));
            } else {
                let myCustomers = customers.QueryResponse.Customer.filter(
                    customer => !!customer.BillAddr === true
                );
                myCustomers = myCustomers.map(customer => {
                    let lat = 0;
                    let long = 0;
                    if (customer.Notes && customer.Notes.split(",").length === 2) {
                        [lat, long] = customer.Notes.split(",");
                    }
                    return {
                        id: customer.Id,
                        shipAddr: {
                            lat: Number.parseFloat(lat),
                            long: Number.parseFloat(long),
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
