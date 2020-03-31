const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

/**
 * Returns an object where each category is a key and its value is an array
 * containing all of the items of that category.
 * @param {Array<Item>} items
 * @return {Object}
 */
function setItemsByCategory(items) {
    const itemsByCategory = {};
    items.forEach(item => {
        if (!itemsByCategory[item.category]) {
            itemsByCategory[item.category] = [];
        }
        itemsByCategory[item.category].push(item);
    });
    return itemsByCategory;
}

/**
 * Fetches all active items of type inventory and cleans each object
 * removing all irrelevant fields for the business logic.
 *
 * For more information about the Item object in the Quickbooks api visit:
 * https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/item#the-item-object
 */
module.exports.getInventory = async () => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.findItems({ Active: true, Type: "Inventory" }, (err, items) => {
            if (err) {
                const parsedErr = QBOUtils.parseError(err);
                return reject(parsedErr);
            }
            const itemsMapped = items.QueryResponse.Item.map(item => {
                return {
                    name: item.Name,
                    id: item.Id,
                    description: item.Description,
                    category: item.ParentRef ? item.ParentRef.name : "Uncategorized",
                    unitPrice: item.UnitPrice,
                    qty: item.QtyOnHand,
                };
            });
            return resolve(itemsMapped);
        });
    });
};
