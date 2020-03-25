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
        qboClientId: {
            type: "varchar",
        },
        visited: {
            type: "boolean",
        },
        address: {
            type: "varchar",
        },
        qboEstimateId: {
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
