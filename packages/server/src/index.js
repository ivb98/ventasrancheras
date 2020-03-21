const express = require("express");
const { port } = require("./config/index");

const app = express();
app.listen(port);
app.use("/", require("./erp/OAuth2/Auth/authToken.routes"));
