module.exports = class VRError extends Error {
    constructor(message, httpStatus = 400) {
        super(message);
        this.httpStatus = httpStatus;
    }
};
