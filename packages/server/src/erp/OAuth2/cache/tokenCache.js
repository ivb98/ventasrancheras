const fs = require("fs");

const cacheFolder = "./cache/";
const cacheFilename = "token.cache.json";
const cacheFileRoute = `${cacheFolder}${cacheFilename}`;

module.exports.save = token => {
    if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
    }
    fs.writeFileSync(cacheFileRoute, JSON.stringify(token), "utf8");
};

module.exports.get = () => {
    if (fs.existsSync(cacheFileRoute)) {
        const cachedToken = JSON.parse(fs.readFileSync(cacheFileRoute, "utf8"));
        return cachedToken;
    }
    return null;
};
