const { app } = require("@azure/functions");
const { container } = require("../cosmosClient");

app.http("updateSeed", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "updateSeed",
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for url "${request.url}"`);
      let updatedSeed;
      try {
        updatedSeed = await request.json();
      } catch (jsonErr) {
        return {
          status: 400,
          jsonBody: { error: "Invalid JSON in request body" },
        };
      }

      if (!updatedSeed.id) {
        return { status: 400, jsonBody: { error: "Seed ID required" } };
      }

      const id = updatedSeed.id.toString();
      const partitionKey = updatedSeed.plotId;

      // In Cosmos DB, if the container has a partition key (e.g., plotId),
      // we must provide it to the item() call to find and replace the correct document.
      const { resource: updatedItem } = await container
        .item(id, partitionKey)
        .replace(updatedSeed);

      return { status: 200, jsonBody: updatedItem };
    } catch (err) {
      context.error("Error updating seed:", err);
      if (err.code === 404) {
        return { status: 404, jsonBody: { error: "Seed not found" } };
      }
      return { status: 500, jsonBody: { error: err.message } };
    }
  },
});
