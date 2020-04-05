const { RolesConstants } = require("@vranch/common");
const Repository = require("../entities/EntityRepository");
const Employee = require("../entities/Employee/Employee");
const Manager = require("../entities/Manager/Manager");
const { createToken } = require("./jwt/index");

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const employee =
        (await Repository.findOne({ email, password }, Employee)) ||
        (await Repository.findOne({ email, password }, Manager));
    if (!employee) return next(new Error("Wrong credentials"));

    const accessToken = createToken(employee.id, employee.role || RolesConstants.MANAGER);
    return res.send({
        email,
        name: employee.name,
        role: employee.role || RolesConstants.MANAGER,
        access_token: accessToken,
    });
};

module.exports.getEmployee = async (req, res, next) => {
    const { id, role } = req;
    const employee =
        role === "manager"
            ? await Repository.findOne({ id }, Manager)
            : await Repository.findOne({ id }, Employee);
    if (!employee) return next(new Error("Employee not found"));
    return res.send({ email: employee.email, name: employee.name, role });
};
