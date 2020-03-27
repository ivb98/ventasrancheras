module.exports.defaultError = (err, req, res, next) => {
    const { message, httpStatus } = err;
    res.status(httpStatus).json({ error: message });
};
