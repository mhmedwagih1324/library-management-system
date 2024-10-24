import { Router } from "express";
import BooksRouter from "../api/routers/books.js";
import usersRouter from "../api/routers/users.js";

const router = Router();

router.use("/books", BooksRouter);
router.use("/users", usersRouter);

export default router;
