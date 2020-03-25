const { EntitySchema } = require("typeorm");
const Employee = require("./Employee");

module.exports = new EntitySchema({
    name: "Employee",
    target: Employee,
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
        qboId: {
            type: "int",
        },
        role: {
            type: "varchar",
        },
    },
});
