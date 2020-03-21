const QBO = require("../OAuth2/auth/QBOAuth");

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

module.exports.getInventory = async () => {
    const qbo = await QBO.getQbo();
    qbo.findItems({ Active: true, Type: "Inventory" }, (err, items) => {
        // console.log(err, items);
        if (err) {
            // console.log(err.Fault.Error);
            // console.log(err.fault.error);
            console.log(err);
        }
        const itemsMapped = items.QueryResponse.Item.map(item => {
            return {
                name: item.Name,
                sku: item.Sku,
                description: item.Description,
                category: item.ParentRef ? item.ParentRef.name : "Uncategorized",
                unitPrice: item.UnitPrice,
                qtyOnHand: item.QtyOnHand,
                invStartDate: item.InvStartDate,
            };
        });
        const categories = setItemsByCategory(itemsMapped);
        console.log(categories);
    });
};
