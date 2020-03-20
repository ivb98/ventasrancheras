const express = require("express");
const { consumerKey, consumerSecret, port } = require("./config/index");

const app = express();
app.listen(port);
app.get("/", (req, res) => {
    res.send("hello world");
});
