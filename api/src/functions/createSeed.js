const { app } = require("@azure/functions");
const { container, ensureReady } = require("../cosmosClient");

app.http("createSeed", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "createSeed",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

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

      const { title, description, plotId } = body;

      if (!title || !description) {
        return {
          status: 400,
          jsonBody: { error: "Title and description required" },
        };
      }

      const newSeed = {
        title,
        description,
        plotId: plotId || null,
        dateCreated: new Date().toISOString(),
      };

      const { resource: createdItem } = await container.items.create(newSeed);

      return { status: 201, jsonBody: createdItem };
    } catch (err) {
      context.error("Error creating seed:", err);
      return { status: 500, jsonBody: { error: err.message } };
    }
  },
});
