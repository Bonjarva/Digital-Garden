// api/test.js
const { app } = require("@azure/functions");

app.http("test", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async () => {
        return { status: 200, body: "works" };
    },
});