import express from "express";
import router from "./router.js";
import docsRouter from "./docs-router.js";
import errorHandler from "../common/middleware/error-handler.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(docsRouter);

app.use("/api", router);

app.use(errorHandler);

export default app;
