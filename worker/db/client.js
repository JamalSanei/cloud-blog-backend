
const { Client } = require("pg");


let dbClient = undefined
async function client() {
    try {
        console.log('db client: ', dbClient)
        if (dbClient == undefined) {
            const client = new Client({
                host: "postgres",
                port: 5432,
                user: "user",
                password: "pass",
                database: "blog",
            });

            return await client.connect();
        }
        return dbClient
    } catch (err) {
        console.error('[Error] connect to db...', err)
    }
}


module.exports = client