import express from "express";
import { config } from "../common/env-variables.js";
import router from "./router.js";
import docsRouter from "./docs-router.js";

const { PORT } = config;

export const initServer = () => {
  const app = express();

  app.use("/api", router);

  app.use(docsRouter);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
};
