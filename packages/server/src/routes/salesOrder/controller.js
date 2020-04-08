const { uploadBase64ToQuickbooks } = require("../../erp/ErpUtils");
const Signature = require("../../erp/Signature/Signature");
const SalesOrder = require("../../erp/Estimate/Estimate");
const Inventory = require("../../erp/Inventory/Inventory");
const Repository = require("../../entities/EntityRepository");
const SalesVisit = require("../../entities/SalesVisit/SalesVisit");

function mapPrices(inventory) {
    const mappedInventory = {};
    inventory.forEach(item => {
        mappedInventory[item.id] = item.unitPrice;
    });

    return mappedInventory;
}
function createLine(items, inventory) {
    const mappedPrices = mapPrices(inventory);
    const created = items.map(item => {
        return {
            SalesItemLineDetail: {
                ItemRef: {
                    value: item.id,
                },
                Qty: item.qty,
            },
            Amount: item.qty * mappedPrices[item.id],
        };
    });
    return created;
}
module.exports.create = async (req, res, next) => {
    const { visitId, customerId, items, signature } = req.body;
    if (!visitId || !customerId || !items || !signature) next(new Error("Missing parameters"));
    try {
        const inventory = await Inventory.getInventory();
        const createdLine = createLine(items, inventory);
        const estimate = await SalesOrder.createSalesOrder({
            CustomerRef: {
                value: customerId,
            },
            Line: createdLine,
        });
        await uploadBase64ToQuickbooks(
            signature,
            `siganture_${estimate.Id}_${new Date().getTime()}`,
            {
                note: "Customer received signature",
                imgName: `customerSignature.jpg`,
                type: "Estimate",
                id: estimate.Id,
            }
        );
        await Repository.update(
            { id: visitId },
            { qbo_estimate_id: estimate.Id, visited: true, date: new Date().getTime() },
            SalesVisit
        );
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
};
