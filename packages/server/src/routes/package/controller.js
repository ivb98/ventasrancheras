/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
const { StatusConstants } = require("@vranch/common");
const { getPackages } = require("../../erp/Packages/Packages");
const Repository = require("../../entities/EntityRepository");
const PackageDelivery = require("../../entities/PackageDelivery/PackageDelivery");

module.exports.getPackages = async (req, res) => {
    const packages = await getPackages();
    const deliveries = await Repository.findAll({}, PackageDelivery);
    const deliveryMap = {};
    for (const { qboReceiptId, status } of deliveries) {
        deliveryMap[qboReceiptId] = status;
    }

    for (const pkg of packages) {
        pkg.status = deliveryMap[pkg.id] || StatusConstants.NOT_ASSIGNED;
    }

    res.send(packages);
};
