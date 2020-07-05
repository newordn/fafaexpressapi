"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "UsersOnPlates",
    embedded: false
  },
  {
    name: "Plat",
    embedded: false
  },
  {
    name: "House",
    embedded: false
  },
  {
    name: "Steed",
    embedded: false
  },
  {
    name: "Product",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/neword-2bedf8/fafaapi/dev`
});
exports.prisma = new exports.Prisma();
