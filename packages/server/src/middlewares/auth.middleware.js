const { VRError } = require("@vranch/common");
const { validateToken } = require("../Auth/jwt/index");

module.exports.validateToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) throw new VRError("No auth header", 400);
    const payload = validateToken(auth.split(" ")[1]);
    if (payload) {
        req.id = payload.id;
        req.role = payload.role;
        return next();
    }
    return next(new VRError("Invalid token", 400));
};
