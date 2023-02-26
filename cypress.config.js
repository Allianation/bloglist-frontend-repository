const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    BACKEND: "http://localhost:3003/api",
  },
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
