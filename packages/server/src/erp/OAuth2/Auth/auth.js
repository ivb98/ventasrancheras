const OAuthClient = require("intuit-oauth");
const Quickbooks = require("node-quickbooks");
const {
    quickBooks: { clientID, clientSecret, appUrl },
} = require("../../../config/index");
const Token = require("./token");

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
module.exports.getAuthUri = () => {
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: "testState",
    });

    return authUri;
};

/**
 * Initializes a new Quickbooks object. With this object requests to the
 * api can be made.
 * @param {Object} info // Obtained once the user logs in into Quickbooks.
 * @param {number} realmId // Obtained once the user logs in into Quickbooks.
 */
function configQuickbooks(info, realmId) {
    return new Quickbooks(
        clientID,
        clientSecret,
        info.access_token,
        false, // no token secret for oAuth 2.0,
        realmId,
        true, // use sandbox
        false, // enableDebuggingm
        null, //  set minorversion, or null for the latest version
        "2.0", // oAuth version
        info.access_token
    );
}

/**
 * This function should be called second in the authentication flow.
 * Once the user has been authenticated, a Quickbooks object will be created
 * to make requests to the API.
 */
module.exports.initializeQbo = (url, realmId) => {
    return new Promise(resolve => {
        oauthClient.createToken(url).then(authResponse => {
            const info = authResponse.getJson();
            qbo = configQuickbooks(info, realmId);
            Token.setToken(info.access_token);
            this.setQbo(qbo);
            resolve(qbo);
        });
    });
};

// Getter
module.exports.getQbo = () => {
    return qbo;
};

// Setter
module.exports.setQbo = newQbo => {
    qbo = newQbo;
};
