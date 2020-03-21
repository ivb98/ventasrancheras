const OAuthClient = require("intuit-oauth");
const QBO = require("./QBOAuth");

const oauthClient = QBO.getOAuthClient();
/**
 * This function should be called first in the authentication flow.
 * Once the user gets his authUri he will be redirected to the Quickbooks
 * website to authenticate.
 */
const getAuthUri = () => {
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: "testState",
    });

    return authUri;
};

/**
 * This function should be called second in the authentication flow.
 * Once the user has been authenticated, a Quickbooks object will be created
 * to make requests to the API.
 */
const initializeQbo = (url, realmId) => {
    return new Promise(resolve => {
        oauthClient.createToken(url).then(authResponse => {
            const info = authResponse.getJson();
            QBO.setRealmId(realmId);
            QBO.setRefreshToken(info.refresh_token);
            QBO.setAccessToken(info.access_token);
            resolve();
        });
    });
};

module.exports.setAuthUri = (req, res) => {
    const authUri = getAuthUri();
    res.redirect(authUri);
};

module.exports.handleRedirect = async (req, res) => {
    await initializeQbo(req.url, req.query.realmId);
    res.send({ ok: true });
};
