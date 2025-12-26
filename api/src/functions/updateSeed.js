const { app } = require("@azure/functions");
let seedsStore = require("../seedStore"); // your in-memory array

app.http("updateSeed", {
  methods: ["PUT"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      context.log(`Http function processed request for url "${request.url}"`);

      const updatedSeed = await request.json();

      if (updatedSeed.id === undefined) {
        return { status: 400, jsonBody: { error: "Seed ID required" } };
      }

      const index = seedsStore.seeds.findIndex(
        (seed) => seed.id === updatedSeed.id
      );
      if (index === -1) {
        return { status: 404, jsonBody: { error: "Seed not found" } };
      }

      seedsStore.seeds[index] = updatedSeed;

      return { status: 200, jsonBody: updatedSeed };
    } catch (err) {
      return { status: 500, jsonBody: { error: err.message } };
    }
  },
});
