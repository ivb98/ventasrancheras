const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

const cleanPackages = packages => {
    const cleanedPackages = packages.map(pkg => {
        try {
            return {
                id: pkg.Id,
                currency: pkg.CurrencyRef.value,
                items: pkg.Line.filter(
                    item => item.DetailType === "SalesItemLineDetail"
                ).map(item => QBOUtils.clearItem(item)),
                customer: {
                    id: pkg.CustomerRef.value,
                    name: pkg.CustomerRef.name,
                },
                address: pkg.ShipAddr,
                total: pkg.TotalAmt,
            };
        } catch (err) {
            return err;
        }
    });

    return cleanedPackages;
};

module.exports.getPackages = async () => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.findInvoices({}, (err, invoices) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(cleanPackages(invoices.QueryResponse.Invoice));
            }
        });
    });
};
