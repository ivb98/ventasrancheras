const express = require("express");
const AuthTokenRoutes = require("./erp/OAuth2/auth/authToken.routes");
const CachedToken = require("./erp/OAuth2/cache/tokenCache");
const QBO = require("./erp/OAuth2/auth/QBOAuth");
const { port } = require("./config/index");
// const { getInventory } = require("./erp/Inventory/Inventory");
const { getCustomers } = require("./erp/Customer/Customer");

const app = express();

async function loadCachedToken() {
    const cachedToken = CachedToken.get();
    if (cachedToken) {
        QBO.setRealmId(cachedToken.realmId);
        QBO.setRefreshToken(cachedToken.refresh_token);
        QBO.setAccessToken(null, cachedToken);
        try {
            // const cust = await getCustomers();
            // console.log(cust);
        } catch (e) {
            console.log(e);
        }
    }
}
async function main() {
    loadCachedToken();
    app.listen(port);
    app.use("/", AuthTokenRoutes);
}

main();
