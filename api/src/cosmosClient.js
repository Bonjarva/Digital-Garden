const { CosmosClient } = require("@azure/cosmos");

const connectionString = process.env.COSMOS_DB_CONNECTION_STRING;

if (!connectionString) {
  console.error("COSMOS_DB_CONNECTION_STRING is NOT defined in the environment.");
}

const client = new CosmosClient(
  connectionString || 
  "AccountEndpoint=https://placeholder.documents.azure.com:443/;AccountKey=placeholder;"
);

const database = client.database("DbDigitalGarden");
const container = database.container("Seeds");

// Helper to ensure database and container exist (handy for new environments)
async function ensureReady() {
  try {
    if (!connectionString) {
      throw new Error("Missing COSMOS_DB_CONNECTION_STRING environment variable.");
    }
    await client.databases.createIfNotExists({ id: "DbDigitalGarden" });
    await database.containers.createIfNotExists({ 
      id: "Seeds",
      partitionKey: "/plotId" 
    });
    console.log("Cosmos DB database and container are ready.");
  } catch (err) {
    console.error("Error ensuring Cosmos DB is ready:", err.message);
    throw err;
  }
}

module.exports = { container, ensureReady };