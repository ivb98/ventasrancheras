const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

function completeSalsOrder(salesOrder) {
    const newSalesOrder = { ...salesOrder };
    newSalesOrder.Line = salesOrder.Line.map(line => {
        return { ...line, DetailType: "SalesItemLineDetail" };
    });
    return newSalesOrder;
}
/**
 * Creates a sales order on QuickbooksServer
 * @param {Object} salesOrder
 * @param {object} salesOrder.CustomerRef Reference to the Quickbook's customer.
 * @param {string} salesOrder.CustomerRef.value Id of the customer in Quickbooks.
 * @param {string} salesOrder.CustomerRef.value DisplayName of the customer in Quickbooks.
 * @param {Object[]} salesOrder.Line Array of items to be included in the salesOrder
 * @param {Object} salesOrder.Line[].SalesItemLineDetail details of the item
 * @param {Object} salesOrder.Line[].SalesItemLineDetail.ItemRef Quickbooks Reference to the item.
 * @param {string} salesOrder.Line[].SalesItemLineDetail.ItemRef.name Name of the Quickbooks item.
 * @param {string} salesOrder.Line[].SalesItemLineDetail.ItemRef.value Id of the item in Quickbooks.salesOrder
 * @param {number} salesOrder.Line[].SalesItemLineDetail.Qty how much of this item to order
 * @param {number} salesOrder.Line[].Amount Price that is displayed on Quickbooks. Usually ItemPrice * Qty.
 */
module.exports.createSalesOrder = async salesOrder => {
    const newSalesOrder = completeSalsOrder(salesOrder);
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.createEstimate(newSalesOrder, (err, estimate) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(estimate);
            }
        });
    });
};
