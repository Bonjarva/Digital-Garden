const { app } = require("@azure/functions");
const store = require("../seedStore");

app.http("createSeed", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    console.log("Request method:", request.method);

    try {
      const { title, description, plotId } = await request.json();
      console.log("Received data:", { title, description, plotId });

      if (!title || !description) {
        return {
          status: 400,
          body: { error: "Title and description required" },
        };
      }

      const newSeed = {
        id: store.nextId++,
        title,
        description,
        plotId: plotId || null,
        dateCreated: new Date().toISOString(),
      };

      store.seeds.push(newSeed);

      return { status: 201, jsonBody: newSeed };
    } catch (err) {
      return { status: 500, body: { error: err.message } };
    }
  },
});
