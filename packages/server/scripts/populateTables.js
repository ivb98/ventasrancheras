require("dotenv").config({ path: "../.env" });
const { createConnection, getConnectionOptions } = require("typeorm");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

async function deleteData(name, dbConnection) {
    await dbConnection
        .createQueryBuilder()
        .delete()
        .from(name)
        .where("id > 0")
        .execute();
}
async function loadFixtures(name, dbConnection) {
    const entityName = name;
    const filepath = path.join(__dirname, `/data/${name}.yaml`);
    let items = [];
    try {
        const file = yaml.safeLoad(fs.readFileSync(filepath, "utf8"));
        items = file.fixtures;
    } catch (e) {
        console.log("fixtures error", e);
    }

    if (!items) {
        return;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const item of items) {
        // eslint-disable-next-line no-await-in-loop
        await dbConnection
            .createQueryBuilder()
            .insert()
            .into(entityName)
            .values(item)
            .execute();
    }
}

async function main() {
    const conf = await getConnectionOptions();
    const con = await createConnection({ ...conf, namingStrategy: new SnakeNamingStrategy() });

    try {
        await deleteData("package_delivery", con);
        await deleteData("sales_visit", con);
        await deleteData("manager", con);
        await deleteData("employee", con);
    } catch (err) {
        // purposedly left empty
    }

    await loadFixtures("employee", con);
    await loadFixtures("manager", con);
    await loadFixtures("sales_visit", con);
    await loadFixtures("package_delivery", con);
}

main();
