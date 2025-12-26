// api/listSeeds/index.js
const { app } = require("@azure/functions");
const seedsStore = require("../seedStore"); // import the in-memory array

app.http("listSeeds", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      // Return the full array
      return {
        status: 200,
        jsonBody: seedsStore.seeds, // <-- important: use jsonBody for proper JSON
      };
    } catch (err) {
      context.log.error(err);
      return {
        status: 500,
        jsonBody: { error: "Failed to retrieve seeds" },
      };
    }
  },
});
