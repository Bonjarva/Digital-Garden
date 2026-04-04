console.log("API entry loaded");

const { app } = require("@azure/functions");
require("./listSeeds");
require("./createSeed");
require("./updateSeed");
require("./deleteSeed");
