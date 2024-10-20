import express from "express";
import { config } from "../common/env-variables.js";
import router from "./router.js";

const { PORT } = config;

export const initServer = () => {
  const app = express();

  app.use("/api", router);

  // eslint-disable-next-line no-console
  app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
};
