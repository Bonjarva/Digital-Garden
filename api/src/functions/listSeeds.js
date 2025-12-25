const { app } = require("@azure/functions");

app.http("listSeeds", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      jsonBody: [
        {
          id: 0,
          title: "Learn React",
          description: "Understand components and state",
          dateCreated: "2025-12-09",
          plotId: 1,
        },
        {
          id: 1,
          title: "Explore Azure",
          description: "Try Cosmos DB and Static Web Apps",
          dateCreated: "2025-12-08",
          plotId: 2,
        },
      ],
    };
  },
});
