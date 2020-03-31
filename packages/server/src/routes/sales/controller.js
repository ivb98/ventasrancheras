/* eslint-disable camelcase */
const { RolesConstants } = require("@vranch/common");
const Repository = require("../../entities/EntityRepository");
const Employee = require("../../entities/Employee/Employee");
const SalesVisit = require("../../entities/SalesVisit/SalesVisit");
const QBOEmployee = require("../../erp/Employee/Employee");

function formatSalesman(salesman, salesVisits) {
    let employeeVisits = salesVisits.filter(salesVisit => {
        return salesVisit.emp.id === salesman.id;
    });
    employeeVisits = employeeVisits.map(visit => {
        const myVisit = { ...visit };
        delete myVisit.qbo_client_id;
        myVisit.customer_id = visit.qbo_client_id;
        delete myVisit.emp;
        return myVisit;
    });

    const formatted = {
        id: salesman.id,
        name: salesman.name,
        email: salesman.email,
        visits: employeeVisits,
    };

    return formatted;
}

module.exports.getSalesmen = async (req, res) => {
    const salesmen = await Repository.findAll({ role: RolesConstants.SALESMAN }, Employee);
    const salesVisits = await Repository.findAll({ relations: ["emp"] }, SalesVisit);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < salesmen.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        salesmen[i] = formatSalesman(salesmen[i], salesVisits);
    }
    res.send({ salesmen });
};

module.exports.getSingleSalesman = async (req, res) => {
    let salesman = await Repository.findOne(
        { id: req.id, role: RolesConstants.SALESMAN },
        Employee
    );
    const salesVisits = await Repository.findAll({ relations: ["emp"] }, SalesVisit);
    salesman = await formatSalesman(salesman, salesVisits);

    res.send({ salesman });
};

module.exports.create = async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return next(new Error("Missing parameters"));
    }
    try {
        const qboEmployee = await QBOEmployee.createEmployee({
            DisplayName: name,
            GivenName: name,
            FamilyName: name,
            PrimaryEmailAddr: {
                Address: email,
            },
        });
        const employee = new Employee(
            email,
            password,
            name,
            qboEmployee.Id,
            RolesConstants.SALESMAN
        );
        const created = await Repository.create(employee, Employee);
        const formmated = formatSalesman(created, []);
        return res.send({ ...formmated });
    } catch (err) {
        return next(new Error("There was an error creating the employee"));
    }
};

module.exports.assign = async (req, res, next) => {
    const { salesmanId, customerId } = req.body;
    const salesVisit = new SalesVisit(salesmanId, customerId, false);
    await Repository.create(salesVisit, SalesVisit);
    res.sendStatus(200);
};
