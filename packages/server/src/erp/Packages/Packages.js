const QBO = require("../OAuth2/auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

const cleanPackages = packages => {
    const cleanedPackages = packages.map(pkg => {
        return {
            id: pkg.Id,
            docNumber: pkg.DocNumber,
            currency: pkg.CurrencyRef.value,
            items: pkg.Line,
            customer: {
                id: pkg.CustomerRef.value,
                name: pkg.CustomerRef.name,
            },
            address: pkg.ShipAddr,
            total: pkg.TotalAmt,
        };
    });

    return cleanedPackages;
};

module.exports.getPackages = async () => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.findInvoices((err, invoices) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(cleanPackages(invoices.QueryResponse.Invoice));
            }
        });
    });
};
