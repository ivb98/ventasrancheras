module.exports.defaultError = (err, req, res, next) => {
    const { message, httpStatus } = err;
    res.status(httpStatus || 400).json({ error: message });
};
