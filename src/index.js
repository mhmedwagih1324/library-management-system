/* eslint-disable no-console */
import sequelize from "./config/db.js";
import seedDatabase from "./database/seed.js";
import { config } from "./common/env-variables.js";
import app from "./config/app.js";

const { PORT } = config;

await sequelize
  .authenticate()
  .then(async () => {
    console.log("Connected to PostgreSQL database");

    await sequelize.sync();

    await seedDatabase({ destroyOld: true });

    app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });
