const Quickbooks = require("node-quickbooks");
const {
    quickBooks: { clientID, clientSecret },
} = require("../../../config/index");

const DEFAULT_ACCESS_TOKEN_EXP = 3600; // 3600 seconds = 1hr
const DEFAULT_REFRESH_TOKEN_EXP = 8600000; // 8,600,000 = 100days

let accessToken = null;
let refreshToken = null;
let realmId = null;

class QBOAuth {
    /**
     * Receives an initialized OAuthClient.
     * This OAuthClient will be used to validate the access token
     * and to renew it once it is expired.
     * @param {OAuthClient} oauthClient
     */
    constructor(oauthClient) {
        this.oauthClient = oauthClient;
    }

    /**
     * Sets the access token for the OAuthClient.
     * @param {string} token
     */
    setAccessToken(token) {
        const accessTokenParams = {
            token_type: "bearer",
            accessToken: token,
            expires_in: DEFAULT_ACCESS_TOKEN_EXP,
            refresh_token: refreshToken,
            x_refresh_token_expires_in: DEFAULT_REFRESH_TOKEN_EXP,
        };
        this.oauthClient.setToken(accessTokenParams);
        accessToken = token;
    }

    setRefreshToken(token) {
        refreshToken = token;
    }

    setRealmId(newRealmId) {
        realmId = newRealmId;
    }

    /**
     * Returns a valid node-quickbooks that can make API calls.
     * If the access token is expired it will be refresed before building
     * the node-quickbooks object.
     */
    getQbo() {
        if (!this.oauthClient.isAccessTokenValid()) {
            this.refreshToken();
        }
        const qbo = this.buildQbo();
        return qbo;
    }

    /**
     * Builds a node-quickbooks object.
     */
    buildQbo() {
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
    refreshToken() {
        const oauthClientCopy = this.oauthClient;
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
}

module.exports = QBOAuth;
