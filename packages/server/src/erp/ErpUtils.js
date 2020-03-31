/**
 * Quickbooks errors come in different casing. Some come with a "Fault"
 * field and some come with a "fault" field. To handle this the error is
 * stringified, converted to lowercase and then parsed into a json again.
 * @param {Error} err
 */
module.exports.parseError = err => {
    const parsedErr = JSON.parse(JSON.stringify(err).toLocaleLowerCase());
    return parsedErr.fault.error[0];
};
