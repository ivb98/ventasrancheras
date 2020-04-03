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
    return {
        id: item.Id,
        description: item.Description,
        name: item.SalesItemLineDetail.ItemRef.name,
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
