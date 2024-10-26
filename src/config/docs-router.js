import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/index.js";

const router = new Router();

router.use("/api-docs", swaggerUi.serve);

router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;
