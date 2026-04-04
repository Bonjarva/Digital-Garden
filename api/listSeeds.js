// api/src/function/listSeeds.js
console.log("listSeeds loaded");

const { app } = require("@azure/functions");
const { container, ensureReady } = require("./cosmosClient");

app.http("listSeeds", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for url "${request.url}"`);
      
      // Ensure DB/Container exist
      await ensureReady();

      // Return the full array
      const plotIdParam = request.query.get("plotId");

      let querySpec;

      if (plotIdParam) {
        // Handle both string and numeric plotId
        const isNumeric = !isNaN(plotIdParam) && !isNaN(parseFloat(plotIdParam));
        
        if (isNumeric) {
          querySpec = {
            query: "SELECT * FROM c WHERE c.plotId = @plotIdStr OR c.plotId = @plotIdNum",
            parameters: [
              { name: "@plotIdStr", value: plotIdParam },
              { name: "@plotIdNum", value: Number(plotIdParam) }
            ]
          };
        } else {
          querySpec = {
            query: "SELECT * FROM c WHERE c.plotId = @plotId",
            parameters: [
              { name: "@plotId", value: plotIdParam }
            ]
          };
        }
      } else {
        querySpec = {
          query: "SELECT * FROM c"
        };
      }

      const { resources: seeds } = await container.items
          .query(querySpec)
          .fetchAll();

      return {
        status: 200,
        jsonBody: seeds,
      };
      
    } catch (err) {
      context.error("Error fetching seeds:", err);
      return {
        status: 500,
        jsonBody: { error: err.message || "Failed to retrieve seeds" },
      };
    }
  },
});
