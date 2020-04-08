/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
const { getCustomers: getQBOCustomers } = require("../../erp/Customer/Customer");
const Repository = require("../../entities/EntityRepository");
const SalesVisit = require("../../entities/SalesVisit/SalesVisit");

module.exports.getCustomers = async (req, res) => {
    const customers = await getQBOCustomers();
    const visits = await Repository.findAll({ visited: false }, SalesVisit);

    for (const customer of customers) {
        customer.assigned = false;
        for (const { qbo_client_id } of visits) {
            if (qbo_client_id === customer.id) {
                customer.assigned = true;
                break;
            }
        }
    }
    res.send(customers);
};
