require("dotenv").config();

const production = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
module.exports = {
    production,
    port,
    quickBooks: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        appUrl: production ? process.env.URL : `http://localhost:${port}`,
        redirectEndpoint: process.env.REDIRECT_ENDPOINT,
    },
};
