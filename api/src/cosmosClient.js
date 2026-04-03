const { CosmosClient } = require("@azure/cosmos");

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

if (!connectionString) {
  // We log this but don't crash here.
  // The actual calls to container.items will fail if this is missing,
  // but the function app should at least start and register its routes.
  console.error("COSMOS_DB_CONNECTION_STRING is not defined in the environment.");
}

const client = new CosmosClient(connectionString || "AccountEndpoint=https://placeholder.documents.azure.com:443/;AccountKey=placeholder;");

const database = client.database("DbDigitalGarden");
const container = database.container("Seeds");

module.exports = { container };