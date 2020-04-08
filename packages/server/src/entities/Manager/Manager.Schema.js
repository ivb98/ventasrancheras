const { EntitySchema } = require("typeorm");
const Manager = require("./Manager");

module.exports = new EntitySchema({
    name: "Manager",
    target: Manager,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        email: {
            unique: true,
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        name: {
            type: "varchar",
        },
    },
});
