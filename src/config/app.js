import express from "express";
import router from "./router.js";
import docsRouter from "./docs-router.js";
import errorHandler from "../common/middleware/error-handler.js";

const app = express();

app.use(docsRouter);

app.use("/api", router);

app.use(errorHandler);

export default app;
