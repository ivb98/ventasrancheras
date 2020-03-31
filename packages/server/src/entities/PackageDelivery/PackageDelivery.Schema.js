const { StatusConstants } = require("@vranch/common");
const { EntitySchema } = require("typeorm");
const PackageDelivery = require("./PackageDelivery");

module.exports = new EntitySchema({
    name: "PackageDelivery",
    target: PackageDelivery,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        qboReceiptId: {
            type: "varchar",
        },
        status: {
            type: "varchar",
            default: StatusConstants.NOT_PICKED_UP,
        },
    },
    relations: {
        emp: {
            target: "Employee",
            type: "many-to-one",
            joinTable: true,
            cascade: true,
        },
    },
});
