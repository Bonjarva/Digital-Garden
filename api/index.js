console.log("API entry loaded");

const { app } = require("@azure/functions");
require("./src/function/listSeeds");
require("./src/function/createSeed");
require("./src/function/updateSeed");
require("./src/function/deleteSeed");
