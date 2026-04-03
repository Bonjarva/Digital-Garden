const { app } = require("@azure/functions");
require("./src/functions/listSeeds");
require("./src/functions/createSeed");
require("./src/functions/updateSeed");
require("./src/functions/deleteSeed");
