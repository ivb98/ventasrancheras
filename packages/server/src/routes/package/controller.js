/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
const { getPackages } = require("../../erp/Packages/Packages");
const Repository = require("../../entities/EntityRepository");
const PackageDelivery = require("../../entities/PackageDelivery/PackageDelivery");

module.exports.getPackages = async (req, res) => {
    const packages = await getPackages();
    const deliveries = await Repository.findAll({}, PackageDelivery);
    const deliveryMap = {};
    for (const { qbo_receipt_id, delivered } of deliveries) deliveryMap[qbo_receipt_id] = delivered;

    for (const pkg of packages) {
        pkg.delivered = deliveryMap[pkg.id] || false;
    }

    res.send(packages);
};
