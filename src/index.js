/* eslint-disable no-console */
import sequelize from "./config/db.js";
import { initServer } from "./config/server.js";
import seedDatabase from "./database/seed.js";

await sequelize
  .authenticate()
  .then(async () => {
    console.log("Connected to PostgreSQL database");
    await sequelize.sync();
    seedDatabase();
    initServer();
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });
