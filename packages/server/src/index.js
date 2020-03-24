const express = require("express");
const AuthTokenRoutes = require("./erp/OAuth2/auth/authToken.routes");
const CachedToken = require("./erp/OAuth2/cache/tokenCache");
const QBO = require("./erp/OAuth2/auth/QBOAuth");
const { port } = require("./config/index");

const app = express();

async function loadCachedToken() {
    const cachedToken = CachedToken.get();
    if (cachedToken) {
        QBO.setRealmId(cachedToken.realmId);
        QBO.setRefreshToken(cachedToken.refresh_token);
        QBO.setAccessToken(null, cachedToken);
        const qbo = await QBO.getQbo();
        qbo.createAttachable({ Note: "My File" }, function(err, attachable) {
            if (err) console.log(err.fault.error);
            else console.log(attachable.Id);
        });
    }
}
async function main() {
    loadCachedToken();
    app.listen(port);
    app.use("/", AuthTokenRoutes);
}

main();
