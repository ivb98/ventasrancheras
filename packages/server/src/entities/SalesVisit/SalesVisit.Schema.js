const { EntitySchema } = require("typeorm");
const SalesVisit = require("./SalesVisit");

module.exports = new EntitySchema({
    name: "SalesVisit",
    target: SalesVisit,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        qbo_client_id: {
            type: "varchar",
        },
        visited: {
            type: "boolean",
        },
        address: {
            type: "varchar",
        },
        qbo_estimate_id: {
            type: "varchar",
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
