const OAuthClient = require("intuit-oauth");
const {
    quickBooks: { clientID, clientSecret, appUrl },
} = require("../../../config/index");
const QBO = require("./QBOAuth");

// Allows to make api requests to quickbooks once it has been set.
let qbo = null;

const oauthClient = new OAuthClient({
    clientId: clientID,
    clientSecret,
    environment: "sandbox",
    redirectUri: `${appUrl}/redirect`,
});

/**
 * This function should be called first in the authentication flow.
 * Once the user gets his authUri he will be redirected to the Quickbooks
 * website to authenticate.
 */
const getAuthUri = () => {
    qbo = new QBO(oauthClient);
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
            qbo.setAccessToken(info.access_token);
            qbo.setRefreshToken(info.refresh_token);
            qbo.setRealmId(realmId);
            resolve(qbo);
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
