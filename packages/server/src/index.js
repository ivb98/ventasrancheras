const path = require("path");
const { createConnection, getConnectionOptions } = require("typeorm");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const express = require("express");
const cors = require("cors");
const AuthTokenRoutes = require("./erp/OAuth2/Auth/authToken.routes");
const CachedToken = require("./erp/OAuth2/cache/tokenCache");
const QBO = require("./erp/OAuth2/Auth/QBOAuth");
const { port } = require("./config/index");
const { defaultError } = require("./middlewares/error.middleware");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./Auth/routes"));
app.use("/customer", require("./routes/customer/routes"));
app.use("/package", require("./routes/package/routes"));
app.use("/item", require("./routes/item/routes"));
app.use("/salesman", require("./routes/sales/router"));
app.use("/payment", require("./routes/payment/routes"));
app.use("/delivery", require("./routes/delivery/routes"));
app.use("/salesorder", require("./routes/salesOrder/routes"));

app.use(defaultError);

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
            // console.log(e);
        }
    }
}
async function main() {
    loadCachedToken();
    try {
        const opts = await getConnectionOptions();
        await createConnection({ ...opts, namingStrategy: new SnakeNamingStrategy() });
    } catch (err) {
        console.log(err);
    }
    app.listen(port);
    app.use("/", AuthTokenRoutes);
    app.get("/ping", (req, res) => {
        res.send({ ok: true });
    });
    const staticFilesPath = path.resolve(__dirname, "../../webapp/build/");
    app.use(express.static(staticFilesPath));
    app.use("/*", (req, res) => {
        res.sendFile(`${staticFilesPath}/index.html`);
    });
}

main();
