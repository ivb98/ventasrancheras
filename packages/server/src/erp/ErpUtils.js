const fs = require("fs");
const base64 = require("base64-img");
const Signature = require("./Signature/Signature");

/**
 * Quickbooks errors come in different casing. Some come with a "Fault"
 * field and some come with a "fault" field. To handle this the error is
 * stringified, converted to lowercase and then parsed into a json again.
 * @param {Error} err
 */
module.exports.parseError = err => {
    const parsedErr = JSON.parse(JSON.stringify(err).toLocaleLowerCase());
    return parsedErr.fault.error[0];
};

module.exports.clearItem = item => {
    const splittedName = item.SalesItemLineDetail.ItemRef.name.split(":");
    const name = splittedName.length > 1 ? splittedName[1] : splittedName[0];
    console.log(name, item.SalesItemLineDetail);
    return {
        id: item.SalesItemLineDetail.ItemRef.value,
        description: item.Description,
        name,
        unitPrice: item.SalesItemLineDetail.UnitPrice,
        qty: item.SalesItemLineDetail.Qty,
    };
};

module.exports.uploadBase64ToQuickbooks = async (b64, name, opts) => {
    const filepath = base64.imgSync(b64, "dest", name);

    const readStream = fs.createReadStream(filepath);
    await Signature.uploadSignature(readStream, opts);
    fs.unlinkSync(filepath);
};

module.exports.mapPackageDates = packages => {
    const packageDateMaps = {};

    packages.forEach(pkg => {
        const customer = pkg.CustomerRef.value;
        const date = new Date(pkg.MetaData.CreateTime).getTime();
        const data = { id: pkg.Id, date };
        if (!packageDateMaps[customer]) {
            packageDateMaps[customer] = data;
        } else {
            packageDateMaps[customer] =
                packageDateMaps[customer].date > data.date ? packageDateMaps[customer] : data;
        }
    });
    return packageDateMaps;
};
