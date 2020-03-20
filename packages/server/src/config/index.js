require("dotenv").config();

const production = process.env.NODE_ENV === "production";

module.exports = {
    production,
    port: process.env.PORT || 3000,
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
};
