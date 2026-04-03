const { app } = require("@azure/functions");
const { container, ensureReady } = require("../cosmosClient");

app.http("deleteSeed", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "deleteSeed",
  handler: async (request, context) => {
    try {
      await ensureReady();
      let body;
      try {
        body = await request.json();
      } catch (jsonErr) {
        return {
          status: 400,
          jsonBody: { error: "Invalid JSON in request body" },
        };
      }

      const { id } = body;
      const { plotId } = body;

      if (!id) {
        return {
          status: 400,
          jsonBody: { error: "Seed ID required" },
        };
      }

      // If plotId is provided in the request body, use it as the partition key.
      // Otherwise, we must query for the item first to get its partition key (if any).
      let partitionKey = plotId;
      if (partitionKey === undefined) {
        // Fallback: search by id to find the item and its partition key.
        const { resources } = await container.items
          .query({
            query: "SELECT c.id, c.plotId FROM c WHERE c.id = @id",
            parameters: [{ name: "@id", value: id.toString() }]
          })
          .fetchAll();

        if (resources.length === 0) {
          return {
            status: 404,
            jsonBody: { error: "Seed not found" },
          };
        }
        partitionKey = resources[0].plotId;
      }

      const { resource: deletedItem } = await container
        .item(id.toString(), partitionKey)
        .delete();

      return {
        status: 200,
        jsonBody: deletedItem,
      };
    } catch (err) {
      context.error("Error deleting seed:", err);
      if (err.code === 404) {
        return {
          status: 404,
          jsonBody: { error: "Seed not found" },
        };
      }
      return {
        status: 500,
        jsonBody: { error: err.message },
      };
    }
  },
});
