const fs = require("fs");
const express = require("express");
const AuthTokenRoutes = require("./erp/OAuth2/auth/authToken.routes");
const CachedToken = require("./erp/OAuth2/cache/tokenCache");
const QBO = require("./erp/OAuth2/auth/QBOAuth");
const { port } = require("./config/index");
// const { getInventory } = require("./erp/Inventory/Inventory");
const { getCustomers } = require("./erp/Customer/Customer");
const { getPackages, getPdf } = require("./erp/Packages/Packages");
const { uploadSignature, addNote } = require("./erp/Signature/Signature");

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
            // const pdf = await getPdf();
            const pkgs = await getPackages();
            console.log(pkgs);
            // const base64 = fs.createReadStream("./img/mytest.jpg");
            // const updated = await uploadSignature(base64, {
            //     note: "Firma de delivery al recibir",
            //     imgName: "firmadelivery.jpg",
            //     id: "159",
            //     type: "Invoice",
            //     imgType: "image/jpg",
            // });
            // console.log(updated);
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
