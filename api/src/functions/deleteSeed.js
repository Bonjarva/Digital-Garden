const { app } = require("@azure/functions");
const store = require("../seedStore");

app.http("deleteSeed", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const { id } = await request.json();

      if (id === undefined) {
        return {
          status: 400,
          jsonBody: { error: "Seed ID required" },
        };
      }

      const index = store.seeds.findIndex((seed) => seed.id === Number(id));

      if (index === -1) {
        return {
          status: 404,
          jsonBody: { error: "Seed not found" },
        };
      }

      const deletedSeed = store.seeds.splice(index, 1)[0];
      console.log(deletedSeed);

      return {
        status: 200,
        jsonBody: deletedSeed,
      };
    } catch (err) {
      context.log.error(err);
      return {
        status: 500,
        jsonBody: { error: err.message },
      };
    }
  },
});
