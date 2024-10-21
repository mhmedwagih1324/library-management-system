import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { readFile } from "fs/promises";

const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger.json", import.meta.url))
);

const router = new Router();

router.use("/api-docs", swaggerUi.serve);

router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;
