const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);

const database = client.database("DbDigitalGarden");
const container = database.container("Seeds");

module.exports = { container };