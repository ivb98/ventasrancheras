const { getAuthUri, initializeQbo } = require("./auth");

module.exports.setAuthUri = (req, res) => {
    const authUri = getAuthUri();
    res.redirect(authUri);
};

module.exports.handleRedirect = async (req, res) => {
    await initializeQbo(req.url, req.query.realmId);
    res.send({ ok: true });
};
