const { getInventory } = require("../../erp/Inventory/Inventory");

module.exports.getItems = async (req, res) => {
    const items = await getInventory();

    res.send([...items]);
};
