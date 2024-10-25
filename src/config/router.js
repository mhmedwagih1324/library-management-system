import { Router } from "express";
import {
  BorrowingProcessesRouter,
  UsersRouter,
  BooksRouter,
} from "../api/routers/index.js";

const router = Router();

router.use("/books", BooksRouter);
router.use("/users", UsersRouter);
router.use("/borrowingProcesses", BorrowingProcessesRouter);

export default router;
