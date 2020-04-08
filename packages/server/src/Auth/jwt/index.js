const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/index");

module.exports.createToken = (id, role) => {
    const token = jwt.sign({ id, role }, jwtSecret, {
        expiresIn: "2y",
    });
    return token;
};

module.exports.validateToken = token => {
    try {
        const { id, role } = jwt.verify(token, jwtSecret);
        return { id, role };
    } catch (err) {
        return null;
    }
};
