const Quickbooks = require("node-quickbooks");
const OAuthClient = require("intuit-oauth");

const {
    quickBooks: { clientID, clientSecret, appUrl },
} = require("../../../config/index");

const TokenCacheManager = require("../cache/tokenCache");

const DEFAULT_ACCESS_TOKEN_EXP = 3600; // 3600 seconds = 1hr
const DEFAULT_REFRESH_TOKEN_EXP = 8600000; // 8,600,000 = 100days

let accessToken = null;
let refreshToken = null;
let realmId = null;
const oauthClient = new OAuthClient({
    clientId: clientID,
    clientSecret,
    environment: "sandbox",
    redirectUri: `${appUrl}/redirect`,
});

class QBOAuth {
    /**
     * Sets the access token for the OAuthClient.
     * @param {string} token
     */
    static setAccessToken(token, cachedToken = null) {
        let accessTokenParams;
        if (!cachedToken) {
            accessTokenParams = {
                token_type: "bearer",
                access_token: token,
                expires_in: DEFAULT_ACCESS_TOKEN_EXP,
                refresh_token: refreshToken,
                x_refresh_token_expires_in: DEFAULT_REFRESH_TOKEN_EXP,
                createdAt: new Date().getTime(),
            };
            TokenCacheManager.save({ ...accessTokenParams, realmId });
        }
        oauthClient.setToken(cachedToken || accessTokenParams);
        accessToken = token || cachedToken.access_token;
    }

    static setRefreshToken(token) {
        refreshToken = token;
    }

    static setRealmId(newRealmId) {
        realmId = newRealmId;
    }

    /**
     * Returns a valid node-quickbooks that can make API calls.
     * If the access token is expired it will be refresed before building
     * the node-quickbooks object.
     */
    static getQbo() {
        if (oauthClient.isAccessTokenValid()) {
            this.refreshToken();
        }
        const qbo = this.buildQbo();
        return qbo;
    }

    /**
     * Builds a node-quickbooks object.
     */
    static buildQbo() {
        const qbo = new Quickbooks(
            clientID,
            clientSecret,
            accessToken,
            false, // no token secret for oAuth 2.0,
            realmId,
            true, // use sandbox
            false, // enableDebuggingm
            null, //  set minorversion, or null for the latest version
            "2.0", // oAuth version
            refreshToken
        );

        return qbo;
    }

    /**
     * Refreshes the access token.
     */
    static refreshToken() {
        const oauthClientCopy = oauthClient;
        return new Promise((resolve, reject) => {
            oauthClientCopy
                .refreshUsingToken(refreshToken)
                .then(authResponse => {
                    resolve(authResponse.json.access_token);
                })
                .catch(e => {
                    reject(e);
                });
        });
    }

    static getOAuthClient() {
        return oauthClient;
    }
}

module.exports = QBOAuth;
