const QBO = require("../OAuth2/auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

/**
 * Creates an employee on Quickbooks and returns it.
 * @param {Object} employee
 * @param {string} employee.GivenName first name
 * @param {string} employee.FamilyName last name
 * @param {string} employee.DisplayName unique name given to this employee
 * @param {Object} employee.PrimaryEmailAddr object containing email address
 * @param {string} employee.PrimaryEmailAddr.Address email address.
 */
module.exports.createEmployee = async employee => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.createEmployee(employee, (err, emp) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(emp);
            }
        });
    });
};
